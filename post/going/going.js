  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyCIK7yediwjnRrzXbBWVY6XsUGLl_eekrM",
      authDomain: "todoapp-a998a.firebaseapp.com",
      databaseURL: "https://todoapp-a998a.firebaseio.com",
      projectId: "todoapp-a998a",
      storageBucket: "todoapp-a998a.appspot.com",
      messagingSenderId: "95979503802"
  };
  firebase.initializeApp(config);

  var user = localStorage.getItem("user");
  var convertUser = JSON.parse(user);
  var userUID = convertUser.userID;
  var database = firebase.database().ref("/");
  var mail = convertUser.mail;
  var eventsPanel = document.getElementById("eventsPanel");

  database.child("goingEvent").on("child_added", function(snap) {
      var obj = snap.val()
      obj.key = snap.key
      console.log(obj)
      var div1 = document.createElement("DIV")
      div1.style = "border-style:solid; border-width: 0px 20px 0px 20px; border-color:purple";

      div1.className = "col s12 m7";
      div1.setAttribute("id", obj.key);
      var div2 = document.createElement("DIV")
      div2.className = "card horizontal";

      var h1 = document.createElement("H1")
      var textH1 = document.createTextNode(obj.nameOfEvent)
      h1.className = "center-align flow-text"
      h1.style = "font-size: 50px";

      var h2 = document.createElement("H2")
      h2.className = "center-align flow-text"
      h2.style = "font-weight:bolder";
      var textH2 = document.createTextNode("Going By: " + obj.name);


      var h2date = document.createElement("H2")
      h2date.className = "center-align flow-text"
      var textH2date = document.createTextNode(obj.dateOfEvent);


      var h2time = document.createElement("H2")
      h2time.className = "center-align flow-text"
      var textH2time = document.createTextNode(obj.timeOfEvent);

      var h3Desc = document.createElement("H3")
      h3Desc.className = "center-align flow-text"
      var textH3Desc = document.createTextNode(obj.detailsOfEvent);

      var ngbtn = document.createElement("BUTTON");
      ngbtn.className = "waves-effect waves-light btn red"
      var ngbtnText = document.createTextNode("Not Going");
      ngbtn.onclick = function() {
          remove(obj.key);
      }
      ngbtn.appendChild(ngbtnText);



      h1.appendChild(textH1)
      h2date.appendChild(textH2date);
      h2time.appendChild(textH2time);
      h3Desc.appendChild(textH3Desc);
      h2.appendChild(textH2)

      // console.log(h4)

      var cardStack = document.createElement("DIV");
      cardStack.className = "card-stacked hoverable";

      var cardContent = document.createElement("DIV");
      cardContent.className = "card-content";

      eventsPanel.appendChild(div1);
      div1.appendChild(div2);
      div1.appendChild(cardStack);
      cardStack.appendChild(cardContent);
      cardContent.appendChild(h1);
      cardContent.appendChild(h3Desc);
      cardContent.appendChild(h2date);
      cardContent.appendChild(h2time);
      cardContent.appendChild(h2);
      cardContent.appendChild(ngbtn)
          // cardContent.appendChild(delbtn);
          // cardContent.appendChild(editbtn);

  });


  function remove(key) {
      database.child("goingEvent/" + key).remove();
  }
  database.child("goingEvent").on("child_removed", function(data) {
      var deleted = document.getElementById(data.key);
      deleted.remove();
      swal(
          "Oh!",
          "You're Not Going",
          "info"
      )
  })