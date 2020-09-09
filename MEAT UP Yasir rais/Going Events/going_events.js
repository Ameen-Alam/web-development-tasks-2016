Database_Events_Ref.on("child_added",
  function (snapshot)
  {
    Database.child("Users/"+user_key+"/Events Statuses/"+snapshot.key).once("value", 
      function (snapshot1)
      {
        var jumbotron = document.createElement("div");
        jumbotron.id = snapshot.key;
        jumbotron.className = "jumbotron";
        if(snapshot1.hasChild("status"))
        {
          if(snapshot1.val().status == true)
          {
            events_list.appendChild(jumbotron);
            generate_event_item_innerHTML(snapshot.key, snapshot.val());
          }
        }
      }
    );
  }
);