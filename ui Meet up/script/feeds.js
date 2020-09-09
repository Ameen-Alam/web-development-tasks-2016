var database = firebase.database().ref("/")
var user = localStorage.getItem("user"); 
var converTopars = JSON.parse(user);
var username = converTopars.fName + " " + converTopars.LName;console.log(username)
var userHeadinName = document.getElementById("userHeadinName").innerHTML = converTopars.fName + " " + converTopars.LName
var userKey = converTopars.userId;console.log(userKey)

database.child("events").on("child_added",function(snapshot){
   var getEventObg = snapshot.val();
    getEventObg.key = snapshot.key;
    showEvents(getEventObg)
  })


var showEvents = (getEventObg) => {
  var cardDiv = document.createElement("DIV")
    cardDiv.setAttribute("class","card");
    var div = document.createElement("DIV")
    div.setAttribute("class","div1")

    var h3Headding = document.createElement("H3")
    h3Headding.setAttribute("class","h3Headding")
    var h3HeaddingText = document.createTextNode(getEventObg.fullName);
    h3Headding.appendChild(h3HeaddingText)
    div.appendChild(h3Headding)
    cardDiv.appendChild(div)

    var h5 = document.createElement("H6")
    h5.setAttribute("class","date")
    var h5Text = document.createTextNode( "Date & Time: " + getEventObg.dateAndTime)
    h5.appendChild(h5Text)
    div.appendChild(h5)
    cardDiv.appendChild(div)
    containerDiv.appendChild(cardDiv)

    var h3 = document.createElement("H3")
    h3.setAttribute("class","event_name") 
    var h3Text = document.createTextNode(getEventObg.nameOfEvents)
    h3.appendChild(h3Text)
    div.appendChild(h3)
    cardDiv.appendChild(div)

    var locatinoP = document.createElement("P")
    locatinoP.setAttribute("class","location")
    var PText = document.createTextNode(getEventObg.location)
    locatinoP.appendChild(PText)
    div.appendChild(locatinoP)
    cardDiv.appendChild(div)

    var discriptionP = document.createElement("P")
    discriptionP.setAttribute("class","disription")
    var discriptionPText = document.createTextNode(getEventObg.description)
    discriptionP.appendChild(discriptionPText)
    div.appendChild(discriptionP)
    cardDiv.appendChild(div)

    var goingbtn = document.createElement("BUTTON")
    goingbtn.setAttribute("class","btn btn-success going_button")
    var goingbtnText = document.createTextNode("Going")
    goingbtn.appendChild(goingbtnText)
    div.appendChild(goingbtn)
    cardDiv.appendChild(div)
    
   
    goingbtn.onclick = function(){
      // var saveToLocaStor = {
      //    nameOfPoster:getEventObg.fullName,
      //    dateAndTime:getEventObg.dateAndTime,
      //    nameOfEvents:getEventObg.nameOfEvents, 
      //    location:getEventObg.location,
      //    description:getEventObg.location,
      // };  
      // localStorage.setItem("saveToLocaStor",JSON.stringify(saveToLocaStor))

    var notGoingbtn = document.createElement("BUTTON")
      notGoingbtn.setAttribute("class","btn btn-danger going_button")
      var notGoingbtnText = document.createTextNode("Not Going")
      notGoingbtn.appendChild(notGoingbtnText)
      div.appendChild(notGoingbtn)
      cardDiv.appendChild(div)
      var nodeToRemove = div.childNodes[5]
      div.removeChild(nodeToRemove)
    notGoingbtn.onclick = function() {
    //  var errorObj = {
    //      divElement:"DIV",
    //      alertDivText:"Now you can not go again!",
    //      userKey:userKey
    //  }
        var alertDiv = document.createElement("DIV")
        alertDiv.setAttribute("class","alert alert-danger alert")
        var alertDivText = document.createTextNode("Now you can not go again!")
        alertDiv.appendChild(alertDivText)
        div.appendChild(alertDiv)
        cardDiv.appendChild(div)
        var nodeToRemove = div.childNodes[5]
        div.removeChild(nodeToRemove)
    }
    }

    var br = document.createElement("HR");
    containerDiv.appendChild(br)
    var br = document.createElement("BR");
    containerDiv.appendChild(br)
    containerDiv.appendChild(br)
    }
    var myEvent = () => {

    }
    var singOut = () => {
        localStorage.clear;
        window.location="../index.html";
    }
    var homePage = () => {  
      window.location = "../Home/home.html"
    }



