var database = firebase.database().ref("/")
var user = localStorage.getItem("user"); 
var converTopars = JSON.parse(user); console.log(converTopars)
var username = converTopars.fName + " " + converTopars.LName;
var eventName = document.getElementById("eventName");



var eventLocation = document.getElementById("eventLocation")
var eventDateAndTime = document.getElementById("eventDateAndTime")
var description = document.getElementById("description");
var containerDiv = document.getElementById("containerDiv")

var userHeadinName = document.getElementById("userHeadinName").innerHTML = converTopars.fName + " " + converTopars.LName

var userKey = converTopars.userId;

function renderEvents(){
    var eventsData = {
        nameOfEvents:eventName.value,
        location:eventLocation.value,
        dateAndTime:eventDateAndTime.value,
        description:description.value,
        fullName:username,
        userKey:userKey
    }
    database.child("events").push(eventsData);
}
if(location.href.indexOf("home") !== -1){
    database.child("events").orderByChild("userKey").equalTo(userKey).on("child_added",function(snapshot){
        var getEventObg = snapshot.val();
        getEventObg.key = snapshot.key;
        showEvents(getEventObg)
      })
    
}
else{
    database.child("events").on("child_added",function(snapshot){
        var getEventObg = snapshot.val();
        getEventObg.key = snapshot.key;
        showEvents(getEventObg)
      })
    
}
function showEvents(getEventObg){

    var cardDiv = document.createElement("DIV")
    cardDiv.setAttribute("class","card")
    var div = document.createElement("DIV")
    div.setAttribute("class","div1")
    div.setAttribute("id",getEventObg.key)
    
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

    var HR = document.createElement("HR");
    containerDiv.appendChild(HR)
    var br = document.createElement("br");
    containerDiv.appendChild(br)

    }


   var singOut = ()=>{ 
   localStorage.clear();
    window.location="../index.html";
   }   

   var allpost = () => {
    window.location="../all-events/feeds.html";
   }