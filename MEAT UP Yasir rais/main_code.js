var Database = firebase.database().ref();
var Database_Events_Ref = Database.child("Events").orderByChild("start_date_time");
var events_list = document.getElementById("events-list");

var user_key;

firebase.auth().onAuthStateChanged( 
  function(user) 
  {
    if (user) 
    {
      // User is signed in.
      user_key = user.uid;
      // console.log(user);
      // ...
    } 
    else 
    {
      // User is signed out.
      // ...
    }
  }
);

function signout()
{
  firebase.auth().signOut()
  .then(function() {
    // Sign-out successful.
      location = "../index.html";
  })
  .catch(function(error) {
    // An error happened.
      alert(error);
  });
}

function going(event_key)
{
  var user_event_status_ref = "Users/" + user_key + "/Events Statuses/"+ event_key + "/";
  var event_going_count_ref = "Events/" + event_key + "/going_count/";
  var event_not_going_count_ref = "Events/" + event_key + "/not_going_count/";
  var event_going_count;
  var event_not_going_count;

  Database.child(event_going_count_ref).once("value",
    function (snapshot)
    {
      event_going_count = snapshot.val();
    }
  );
  Database.child(event_not_going_count_ref).once("value",
    function (snapshot)
    {
      event_not_going_count = snapshot.val();
    }
  );
  
  Database.child(user_event_status_ref).once("value",
    function (snapshot)
    {
      if (!snapshot.hasChild("status"))
      {
        //Not sure to Going
        Database.child(user_event_status_ref).set({status: true});
        Database.child(event_going_count_ref).set(++event_going_count);
      }
      else if (snapshot.val().status == false)
      {
        //Not Going to Going
        Database.child(user_event_status_ref).set({status: true});
        Database.child(event_not_going_count_ref).set(--event_not_going_count);
        Database.child(event_going_count_ref).set(++event_going_count);
      }
    }
  );
}

function not_going(event_key)
{
  var user_event_status_ref = "Users/" + user_key + "/Events Statuses/"+ event_key + "/";
  var event_going_count_ref = "Events/" + event_key + "/going_count/";
  var event_not_going_count_ref = "Events/" + event_key + "/not_going_count/";
  var event_going_count;
  var event_not_going_count;

  Database.child(event_going_count_ref).once("value",
    function (snapshot)
    {
      event_going_count = snapshot.val();
    }
  );
  Database.child(event_not_going_count_ref).once("value",
    function (snapshot)
    {
      event_not_going_count = snapshot.val();
    }
  );
  
  Database.child(user_event_status_ref).once("value",
    function (snapshot)
    {
      if (!snapshot.hasChild("status"))
      {
        //Not sure to Not Going
        Database.child(user_event_status_ref).set({status: false});
        Database.child(event_not_going_count_ref).set(++event_not_going_count);
      }
      else if (snapshot.val().status == true)
      {
        //Going to Not Going
        Database.child(user_event_status_ref).set({status: false});
        Database.child(event_going_count_ref).set(--event_going_count);
        Database.child(event_not_going_count_ref).set(++event_not_going_count);
      }
    }
  );
}

function not_sure(event_key)
{
  var user_event_status_ref = "Users/" + user_key + "/Events Statuses/"+ event_key + "/";
  var event_going_count_ref = "Events/" + event_key + "/going_count/";
  var event_not_going_count_ref = "Events/" + event_key + "/not_going_count/";
  var event_going_count;
  var event_not_going_count;

  Database.child(event_going_count_ref).once("value",
    function (snapshot)
    {
      event_going_count = snapshot.val();
    }
  );
  Database.child(event_not_going_count_ref).once("value",
    function (snapshot)
    {
      event_not_going_count = snapshot.val();
    }
  );
  
  Database.child(user_event_status_ref).once("value",
    function (snapshot)
    {
      if (snapshot.val().status == true)
      {
        //Going to Not Sure
        Database.child(user_event_status_ref).remove();
        Database.child(event_going_count_ref).set(--event_going_count);
      }
      else if (snapshot.val().status == false)
      {
        //Not Going to Not Sure
        Database.child(user_event_status_ref).remove();
        Database.child(event_not_going_count_ref).set(--event_not_going_count);
      }
    }
  );
}

function generate_event_item_innerHTML(id, Event)
{ 
  var user_event_status_ref = "Users/" + user_key + "/Events Statuses/"+ id + "/";
  
  Database.child(user_event_status_ref).once("value")
  .then(
    function (snapshot)
    { 
      var btns;
      if(snapshot.hasChild("status"))
      {
        if (snapshot.val().status == true)
        {
          //Going Buttons
          btns = "<p class=\"lead\"><button onClick=\"not_sure(\'" + id + "\');\" class=\"btn btn-secondary\">Not Sure</button>&nbsp;<button onClick=\"not_going(\'" + id + "\');\" class=\"btn btn-primary\">Not Going To Event <span class=\"badge badge-info\">" + Event.not_going_count + "</span></button></p>";
        }
        else if (snapshot.val().status == false)
        {
          //Not Going Buttons
          btns = "<p class=\"lead\"><button onClick=\"not_sure(\'" + id + "\');\" class=\"btn btn-secondary\">Not Sure</button>&nbsp;<button onClick=\"going(\'" + id + "\');\" class=\"btn btn-primary\">Going To Event <span class=\"badge badge-info\">" + Event.going_count + "</span></button></p>";
        }
      }
      else if (!snapshot.hasChild("status"))
      {
        //Not Sure Buttons
        btns = "<p class=\"lead\"><button onClick=\"going(\'" + id + "\');\" class=\"btn btn-primary\">Going To Event <span class=\"badge badge-info\">" + Event.going_count + "</span></button>&nbsp;<button onClick=\"not_going(\'" + id + "\');\" class=\"btn btn-warning\">Not Going To Event <span class=\"badge badge-info\">" + Event.not_going_count + "</span></button></p>";
      }
      var jumbotron_innerHTML = "<h3 class=\"display-5\">" + Event.name + ".</h3><p class=\"lead\"><strong>Event Description:</strong>  " + Event.description + ".</p><p class=\"lead\"><strong>Event Location:</strong> " + Event.location + ".</p><p class=\"lead\"><strong>Event Starting Date:</strong> " + Event.start_date_time.replace('T',' / ') + "</p><p class=\"lead\"><strong>Event Ending Date:</strong> " + Event.end_date_time.replace('T',' / ') + "</p><p class=\"lead\"><strong>Event Organizer:</strong> " + Event.organizer + ".</p><hr class=\"my-4\">" + btns ;

      document.getElementById(id).innerHTML = jumbotron_innerHTML;
    }
  );
}

// Database.child("Events").on("child_changed",
//   function (snapshot)
//   {
//     var jumbotron = document.createElement("div");
//     jumbotron.id = snapshot.key;
//     jumbotron.className = "jumbotron";
//     events_list.replaceChild(jumbotron, document.getElementById(snapshot.key));
//     generate_event_item_innerHTML( snapshot.key, snapshot.val());
//   }
//);  
Database_Events_Ref.on("child_changed",
  function ()
  {
    window.location.reload(true);
  }
); 

Database_Events_Ref.on("child_removed",
  function (snapshot)
  {
    document.getElementById(snapshot.key).remove();
  }
);
