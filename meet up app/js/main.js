var username=document.getElementById("username");
var email=document.getElementById("email");
var password=document.getElementById("password");
var navuser=document.getElementById("navuser");

var database = firebase.database().ref("/")
var inputemail = document.getElementById("inputemail");
var inputpassword = document.getElementById("inputpassword");
// var auth=firebase.auth();
function submit(){
  var  user={
        name:username.value,
        email:email.value,
        password:password.value
    }
    // database.child("users").push(user)
    // console.log(user)

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(function (res){
      user.useruid=res.uid;
        database.child("user/" + res.uid).set(user)
            .then(function (success) {
                $('#signupmodal').modal('hide');
                $('#signupsuccessmodal').modal('show');
                
                
        })
        })
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
username.value="";
email.value="";
password.value=""
}






document.getElementById("stop").addEventListener("submit",

    function submit(event) {
        if (inputemail.value != "" || inputpassword.value != "") {
            event.preventDefault()
            var user = {
                email: inputemail.value,
                password: inputpassword.value
            }
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(function (success) {
                    database.child('user/' + success.uid).once("value", function (snapshot) {
                        localStorage.setItem("user", JSON.stringify(snapshot.val()))
                    }).then(function (success) {
                        window.location = "home/home.html"
                        
                    })
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
        }
        else if(inputemail.value == ""||inputpassword.value==""){
    alert("Please Enter Email/Password");
        }
    })


    var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
//   document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
