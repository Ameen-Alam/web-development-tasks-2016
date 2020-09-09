var database = firebase.database().ref("/");
var eventoutput=document.getElementById("eventoutput");


function navfunction(){
    var navuser=document.getElementById("navuser");

   var localuser= localStorage.getItem("user");
   localuser=JSON.parse(localuser);

   var username=localuser.name;
var fchar=username.slice(0,1);
fchar=fchar.toUpperCase();
var lchar=username.slice(1)
lchar=lchar.toLowerCase();
var fullname=fchar+lchar;
navuser.innerHTML+=fullname;
}


function logout(){
localStorage.removeItem("user");
window.location.href="../index.html"
}

// database.child("posts").on("child_added", function(snapshot){
//     var obj = snapshot.val();
//     obj.id = snapshot.key;
//     render(obj);
// })

database.child("userevents").on("child_added", function(snap){
    var obj=snap.val();
    obj.key=snap.key
    renderevent(obj);
})






function renderevent(obj){
var maincarddiv=document.createElement("div");
maincarddiv.setAttribute("class","card text-center")
maincarddiv.setAttribute("id","eventoutput")



var cardheader=document.createElement("div");
cardheader.setAttribute("class","card-header");
var headertextnode=document.createTextNode(obj.eventname);
cardheader.appendChild(headertextnode);


var cardbody=document.createElement("div");
cardbody.setAttribute("class","card-body");

var cardheadingmain=document.createElement("h1");
cardheadingmain.setAttribute("class","card-title");
var cardheadingmaintext=document.createTextNode("Venue");
cardheadingmain.appendChild(cardheadingmaintext);


var cardheading=document.createElement('h4');
cardheading.setAttribute("class","card-title");
var cardheadingtext=document.createTextNode(obj.eventlocation);
cardheading.appendChild(cardheadingtext);

var cardpara=document.createElement("p");
cardpara.setAttribute("class","card-text");
var cardparatext=document.createTextNode(obj.eventdescription);
cardpara.appendChild(cardparatext);




var cardfooter=document.createElement("div");
cardfooter.setAttribute("class","card-footer text-muted");

var footerdateheading=document.createElement("h4");
var footerdateheadingtext=document.createTextNode("Date");
footerdateheading.appendChild(footerdateheadingtext);
var footerdate=document.createElement("p");
var footerdatetext=document.createTextNode(obj.eventdate);
footerdate.appendChild(footerdatetext);


var goingbutton=document.createElement("button");
goingbutton.setAttribute("class","btn btn-success customgoingbtnstyle")
goingbutton.setAttribute("id",obj.key)

goingbutton.setAttribute("onclick","goingfunction(this.id)")

goingbutton.innerHTML="Going!"





var footertimeheading=document.createElement("h4");
var footertimeheadingtext=document.createTextNode("Time");
footertimeheading.appendChild(footertimeheadingtext);
var footertime=document.createElement("p");
var footertimetext=document.createTextNode(obj.eventtime);
footertime.appendChild(footertimetext);


var eventcreator=document.createElement("small");
eventcreator.style.cssFloat="right"
var eventcreatortext=document.createTextNode("Event Created By "+obj.eventcreator);
eventcreator.appendChild(eventcreatortext);






cardfooter.appendChild(footerdateheading);
cardfooter.appendChild(footerdate);

cardfooter.appendChild(footertimeheading);
cardfooter.appendChild(footertime);
cardfooter.appendChild(eventcreator)



cardbody.appendChild(cardheadingmain)
cardbody.appendChild(cardheading)
cardbody.appendChild(cardpara)
cardbody.appendChild(goingbutton);

maincarddiv.appendChild(cardheader);
maincarddiv.appendChild(cardbody);
maincarddiv.appendChild(cardfooter);
eventoutput.appendChild(maincarddiv);
}

function goingfunction(btnid){
 var goinglocaluser=localStorage.getItem("user");
  goinglocaluser=JSON.parse(goinglocaluser);
  var useruid=goinglocaluser.useruid

  // database.child("user").child(useruid).on("child_added", function(snap){
  //   localStorage.setItem("user",)
  if(goinglocaluser.eventarray==undefined){
    goinglocaluser.eventarray=[];
    goinglocaluser.eventarray.push(btnid);
    document.getElementById(btnid).innerHTML="&#10004;"
    localStorage.removeItem("user");
    localStorage.setItem("user",JSON.stringify(goinglocaluser))
    database.child("user").child(useruid).set(goinglocaluser)
    
  }
  else{
    var x=goinglocaluser.eventarray.length;
    var boolean=false;
    for(var i=0; i<x;i++){
      if(goinglocaluser.eventarray[i]==btnid){
          $("#newsfeedmodal").modal("show")
        boolean=true;
      }      
    }

    if(boolean==false){
      localStorage.removeItem("user");        
      goinglocaluser.eventarray.push(btnid);
      document.getElementById(btnid).innerHTML="&#10004;"
      
      // alert()
      localStorage.setItem("user",JSON.stringify(goinglocaluser))
      database.child("user").child(useruid).set(goinglocaluser)
      
    }
    
  }

}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("myBtn").style.display = "block";
        document.getElementById("navid").style.opacity="0.4"
        
    } else {
        document.getElementById("myBtn").style.display = "none";
        document.getElementById("navid").style.opacity="1"
        
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera 
    document.documentElement.scrollTop = 0; // For IE and Firefox
}