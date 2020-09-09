var database = firebase.database().ref("/")

var eventname=document.getElementById("eventname")
var eventlocation=document.getElementById("eventlocation");
var eventdate=document.getElementById("eventdate");
var eventtime=document.getElementById("eventtime");
var eventdescription=document.getElementById("eventdescription");

function createevent(){
var localuser=localStorage.getItem("user");
localuser=JSON.parse(localuser);
var eventobject={
    eventcreator:localuser.name,
    eventname:eventname.value,
    eventlocation:eventlocation.value,
    eventdate:eventdate.value,
    eventtime:eventtime.value,
    eventdescription:eventdescription.value
}
if(eventname.value!=""&&eventlocation.value!=""&&eventdate.value!=""&&eventtime.value!=""&&eventdescription.value!=""){
database.child("userevents").push(eventobject);
eventname.value="";
eventlocation.value="";
eventdate.value="";
eventtime.value="";
eventdescription.value="";

$('#createeventmodal').modal('hide');
$('#eventcreatesuccessmodal').modal('show');


}
}



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