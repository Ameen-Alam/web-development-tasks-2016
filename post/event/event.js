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


let signOut = document.getElementById("signOut");
let user = localStorage.getItem("user");
let convertUser = JSON.parse(user);
let userUID = convertUser.userID
let database = firebase.database().ref('/')

let wName = document.getElementById("wName");
let wEmail = document.getElementById("wEmail");

let createPost = document.getElementById("createPost");
let eventName = document.getElementById("eventName");
let eventDate = document.getElementById("evemtDate");
let eventTime = document.getElementById("eventTime");
let description = document.getElementById("description");
let createP = document.getElementById("createP");
let eventsPanel = document.getElementById("eventsPanel");

wName.innerHTML = convertUser.name;
wEmail.innerHTML = convertUser.gmail;

createP.onclick = function() {
    if (eventName.value === "") {
        swal(
            'OOps...',
            'Event Name is Empty',
            'error'
        )
        eventName.focus();
    } else if (eventDate.value === "") {
        swal(
            'OOps...',
            'Event Date is Empty',
            'error'
        )
    } else if (eventTime.value === "") {
        swal(
            'OOps...',
            'Event Time is Empty',
            'error'
        )
    } else {
        var eventsCreate = {
            userName: convertUser.name,
            nameOfEvent: eventName.value,
            dateOfEvent: eventDate.value,
            timeOfEvent: eventTime.value,
            detailsOfEvent: description.value,
            gmail: wEmail
        };
        // console.log(eventsCreate);
        database.child("eventsCreate").push(eventsCreate);
        eventName.value = "";
        eventDate.value = "";
        eventTime.value = "";
        description.value = "";
    }
}

database.child("eventsCreate").on("child_added", function(snap) {
    var obj = snap.val();
    obj.key = snap.key
    console.log(obj);
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

    var textH2 = document.createTextNode("Created By: " + obj.userName);


    var h2date = document.createElement("H2")
    h2date.className = "center-align flow-text"
    var textH2date = document.createTextNode(obj.dateOfEvent);


    var h2time = document.createElement("H2")
    h2time.className = "center-align flow-text"
    var textH2time = document.createTextNode(obj.timeOfEvent);

    var h3Desc = document.createElement("H3")
    h3Desc.className = "center-align flow-text"
    var textH3Desc = document.createTextNode(obj.detailsOfEvent);

    var gbtn = document.createElement("BUTTON");
    gbtn.className = "waves-effect waves-purple btn-flat right"
    gbtn.style = "border: 2px solid grey"
    var gbtnText = document.createTextNode("Going");
    gbtn.appendChild(gbtnText);
    gbtn.onclick = function() {
        goingFunc(obj.key, obj.nameOfEvent, obj.dateOfEvent, obj.timeOfEvent, obj.detailsOfEvent, obj.userName) // obj.userName
        gbtn.style.display = "none";
        var p = document.createElement("P");
        p.innerHTML = "Added to Interested Events"
        p.style.fontSize = "10px;"
        p.className = "text-red right-align"
        cardContent.appendChild(p);
    }



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
    cardContent.appendChild(gbtn);
});
// 
// 
// 

function goingFunc(id, event_Name, event_Date, event_Time, event_Details, user_Name) {

    var goingEvent = {
        id: id,
        nameOfEvent: event_Name,
        dateOfEvent: event_Date,
        timeOfEvent: event_Time,
        detailsOfEvent: event_Details,
        userName: user_Name,
        name: convertUser.name
    };
    database.child("goingEvent").push(goingEvent).then()
    swal(
        'Congo...',
        'Event is Added to Interested Events',
        'success'
    )
};



// 
// 
// 








// logout button
signOut.onclick = function() {
    localStorage.clear();
    window.location.replace("../login/login.html") //
}

// let wName = document.getElementById('wName').innerHTML = convertUser.name

// let input = document.getElementById('input');
// let falto = document.getElementById('falto');
// let faltoKa = document.getElementById('faltoKa');
// falto.onclick= function(){
//     console.log("wawa")
//     let paragraph = document.createElement('p')
//     let paragraphText = document.createTextNode(input.value)
//     paragraph.appendChild(paragraphText)
//     paragraph.setAttribute('class' , "bg-grey text-white")

//     let button = document.createElement('BUTTON')
//     button.setAttribute("class", "btn btn-info")
//     button.setAttribute("onclick", "going()")

//     let buttonText = document.createTextNode("Going")
//     button.appendChild(buttonText);


//     faltoKa.appendChild(paragraph)
//     faltoKa.appendChild(button)
// }
// let goingka = document.getElementById("goingka")
// function going(){
//     let para = document.createElement('p')
//     let paraText = document.createTextNode("wWAW " + convertUser.name)
//     para.appendChild(paraText)
//     goingka.appendChild(para)
// }

// {"aGe":"18","cell":"3043866719","dOfb":"2017-12-31","gmail":"ameenalam202@gmail.com","name":"Ameen alam","pword":"doblier","userID":"029vaquBUqhwBgh9wadqFrlvifP2"}

//{"uid":"029vaquBUqhwBgh9wadqFrlvifP2","displayName":null,"photoURL":null,"email":"ameenalam202@gmail.com","emailVerified":false,"phoneNumber":null,"isAnonymous":false,"providerData":[{"uid":"ameenalam202@gmail.com","displayName":null,"photoURL":null,"email":"ameenalam202@gmail.com","phoneNumber":null,"providerId":"password"}],"apiKey":"AIzaSyCIK7yediwjnRrzXbBWVY6XsUGLl_eekrM","appName":"[DEFAULT]","authDomain":"todoapp-a998a.firebaseapp.com","stsTokenManager":{"apiKey":"AIzaSyCIK7yediwjnRrzXbBWVY6XsUGLl_eekrM","refreshToken":"APWA_koTCkNdLzqFF5WVNjF-tL5Q0KexdhqzBsQSClxXYTI-bPnMMJmUvAtVCzHZNUdD5ftv2-Iyq_4XvSp6Cpo55wHDgspinWXGvfxm25IWOowLHeepXjfWjWf_OGSBgR4PIhEtZFcHz1GyKagGb2mMLnFAhq_v1ChXEq5QZyyMlLg-yZ1JsYZVaiPU2EMegTTHCUUXwjfVF36Y22NQ__IVM0I9Nm0WgA","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImEwODc4ZTQyN2U2MDlhYjMxMDBkNzQ3ZjcwNzg5MGFkYWI3YzQ5ZGEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdG9kb2FwcC1hOTk4YSIsImF1ZCI6InRvZG9hcHAtYTk5OGEiLCJhdXRoX3RpbWUiOjE1MTAxNDQ5ODIsInVzZXJfaWQiOiIwMjl2YXF1QlVxaHdCZ2g5d2FkcUZybHZpZlAyIiwic3ViIjoiMDI5dmFxdUJVcWh3QmdoOXdhZHFGcmx2aWZQMiIsImlhdCI6MTUxMDE0NDk4MiwiZXhwIjoxNTEwMTQ4NTgyLCJlbWFpbCI6ImFtZWVuYWxhbTIwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYW1lZW5hbGFtMjAyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.ffo0RdKx9Qc-olQr-Hb4ShXOxyor8zHE7dtBJWrrKmW1PVWeYLhJKqmTRlD8G4D2PSEVYPqLOucXhcOK6r8Qj7rvOh17Kin7wbi7PqGIVUiOpnA-HDXDUEKbFFeUbQuMdOdGf25AD8_3c0XGJ373bpV_HheTueSQlGXCr8UArJ5GCR3zmOp7tYxFoXN369SlQI-bjYKE0Tmip61Py_7IuwzRe7w2tPhxo6qeG4i05mmwASXeWJWC684zlgZUbNQtDN4kftBONFPUTF_Fb5gXeXtJvkQqgSr5zg9l-77zG5yTaseD6yC0vK2zD75mivhqxL8jNw34vRZWmEFkQeK_2g","expirationTime":1510148580709},"redirectEventId":null,"lastLoginAt":"1510144982000","createdAt":"1510089770000"}