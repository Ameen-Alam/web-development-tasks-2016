var database = firebase.database().ref("/") 
var eventsData = localStorage.getItem("saveToLocaStor")
var converToPars = JSON.parse(eventsData);



var eventsDataObj = {
    // nameOfPoster:converToPars.fullName,
    dateAndTime:converToPars.dateAndTime,
    nameOfEvents:converToPars.nameOfEvents, 
    location:converToPars.location,
    description:converToPars.location,
}


database.child("eventsDataObj").push(eventsDataObj);


database.child("eventsDataObj").on("child_added",function(data){
    var getData = data.val()
    getData.key = data.key;
    showEvents(getData)
})
function showEvents(gettedData){
    
        var cardDiv = document.createElement("DIV")
        cardDiv.setAttribute("class","card")
        var div = document.createElement("DIV")
        div.setAttribute("class","div1")
        div.setAttribute("id",gettedData.key)
        
        var h3Headding = document.createElement("H3")
        h3Headding.setAttribute("class","h3Headding")
        var h3HeaddingText = document.createTextNode("Hello");    
        h3Headding.appendChild(h3HeaddingText) 
        div.appendChild(h3Headding)
        cardDiv.appendChild(div)
    
        var h5 = document.createElement("H6")
        h5.setAttribute("class","date")
        var h5Text = document.createTextNode( "Date & Time: " + gettedData.dateAndTime)
        h5.appendChild(h5Text)
        div.appendChild(h5)
        cardDiv.appendChild(div)
        containerDiv.appendChild(cardDiv)
    
        var h3 = document.createElement("H3")
        h3.setAttribute("class","event_name") 
        var h3Text = document.createTextNode(gettedData.nameOfEvents)
        h3.appendChild(h3Text)
        div.appendChild(h3)
        cardDiv.appendChild(div)
    
        var locatinoP = document.createElement("P")
        locatinoP.setAttribute("class","location")
        var PText = document.createTextNode(gettedData.location)
        locatinoP.appendChild(PText)
        div.appendChild(locatinoP)
        cardDiv.appendChild(div)
    
        
        var discriptionP = document.createElement("P")
        discriptionP.setAttribute("class","disription")
        var discriptionPText = document.createTextNode(gettedData.description)
        discriptionP.appendChild(discriptionPText)
        div.appendChild(discriptionP)
        cardDiv.appendChild(div)
    
        var HR = document.createElement("HR");
        containerDiv.appendChild(HR)
        var br = document.createElement("br");
        containerDiv.appendChild(br)
    
        }