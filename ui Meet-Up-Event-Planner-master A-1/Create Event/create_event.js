var event_name = document.getElementById("event-name");
var event_description = document.getElementById("event-description");
var event_location = document.getElementById("event-location");
var event_start_datetime = document.getElementById("event-start-datetime");
var event_end_datetime = document.getElementById("event-end-datetime");
var event_organizer = document.getElementById("event-organizer");
var event_status = document.getElementsByName("event-status");

function strTOToggleCase(input)
{
  input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

  for (var i = 0; i < input.length; i++)
  {
      if(input.charAt(i) === " ")
      {
          input = input.slice(0, i + 1) + input.charAt(i + 1).toUpperCase() + input.slice(i + 2);
      }
      else if(input.charAt(i) === " " && input.charAt(i + 1)=== " ")
      {
          input = input.slice(0, i + 2) + input.charAt(i + 2).toUpperCase() + input.slice(i + 3);
      }
      else if(input.charAt(i) === " " && input.charAt(i + 1) === " " && input.charAt(i + 2) === " ")
      {
          input = input.slice(0, i + 3) + input.charAt(i + 3).toUpperCase() + input.slice(i + 4);
      }
  }
  return input;
}

function create_event()
{
  var Event =
  {
    name: strTOToggleCase(event_name.value),
    description: strTOToggleCase(event_description.value),
    location: strTOToggleCase(event_location.value),
    start_date_time: event_start_datetime.value,
    end_date_time: event_end_datetime.value,
    organizer: strTOToggleCase(event_organizer.value),
    user_uid: user_key,
    going_count: 0,
    not_going_count: 0
  };
  for (var i=0; i < event_status.length; i++) {
    if ( event_status[i].checked ) { // radio checked?
        var x = event_status[i].value; // if so, hold its value in val
        break; // and break out of for loop
    }
  }
  if (x == 1)
  {
    Event.going_count += 1;
    Database.child("Events").push(Event)
      .then(
        function (snapshot)
        {
          Database.child("Users/" + Event.user_uid + "/Events Statuses/"+snapshot.key).set({status: true});
          alert("Event Created Sucessfuly!");
        }
      )
      .catch(
        function(error) 
        {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        }
      );
  }
  else if (x == -1)
  {
    Event.not_going_count += 1;
    Database.child("Events").push(Event)
      .then(
        function (snapshot)
        {
          Database.child("Users/" + Event.user_uid + "/Events Statuses/"+snapshot.key).set({status: false});
          alert("Event Created Sucessfuly!");
        }
      )
      .catch(
        function(error) 
        {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        }
      );
  }
  else
  {
    Database.child("Events").push(Event)
      .then(
        function()
        {
          alert("Event Created Sucessfuly!");
        }
      )
      .catch(
        function(error) 
        {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        }
      );
  }
}