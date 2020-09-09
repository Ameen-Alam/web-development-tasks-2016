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



function myeventfunction(){
var myeventlocaluser=localStorage.getItem("user");
myeventlocaluser=JSON.parse(myeventlocaluser);
var eventarray=myeventlocaluser.eventarray;
database.child("userevents").on("child_added", function(snap){
    var obj=snap.val();
    obj.key=snap.key

    for(var i=0; i<eventarray.length;i++){
        if(eventarray[i]==obj.key){
            


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
            
            
            
            
                    
            
            
            var notgoingbutton=document.createElement("button");
            notgoingbutton.setAttribute("class","btn btn-danger customgoingbtnstyle")
            notgoingbutton.setAttribute("onclick","notgoingfunction(this.id)")

            notgoingbutton.setAttribute("id",obj.key)
            notgoingbutton.innerHTML="Not Going!"
            
            
            
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
            cardbody.appendChild(notgoingbutton)
            
            maincarddiv.appendChild(cardheader);
            maincarddiv.appendChild(cardbody);
            maincarddiv.appendChild(cardfooter);
            eventoutput.appendChild(maincarddiv);
        }
    }

console.log(obj.name)
})

}


function notgoingfunction(btnid){
local=localStorage.getItem("user");
local=JSON.parse(local);
var useruid=local.useruid;

for(var i=0;i<local.eventarray.length;i++){
    if(local.eventarray[i]==btnid){
        
    local.eventarray.splice(btnid,1);
    break
    }
}
localStorage.setItem("user",JSON.stringify(local));
database.child("user").child(useruid).set(local)
var buttonparent=document.getElementById(btnid).parentElement;
var grandparent=buttonparent.parentElement;
grandparent.style.opacity="0.4";

setTimeout(function() {grandparent.style.display="none";},2000)
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
    document.getElementById("navid").style.opacity="1"
    
}

function logout(){
    localStorage.removeItem("user");
    window.location.href="../index.html"
    }

myeventfunction()