var Database = firebase.database().ref();

var signin_email = document.getElementById("signin-email");
var signin_password = document.getElementById("signin-password");

var signup_first_name = document.getElementById("signup-first-name");
var signup_last_name = document.getElementById("signup-last-name");
var signup_email = document.getElementById("signup-email");
var signup_password = document.getElementById("signup-password");

function signin()
{
    var email =document.getElementById("signin-email").value.toLowerCase();
    var password = document.getElementById("signin-password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            function(snapshot)
            {
                alert("Login Sucessful!");
                location = "All Events/index.html";
            }
        )
        .catch(
            function(error) 
            {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                // ...
            }
    );
}

function sign_up()
{
    var User =
    {
        name: signup_first_name.value.toLowerCase() + " " + signup_last_name.value.toLowerCase(),
        email: signup_email.value.toLowerCase(),
        password: signup_password.value
    };
    signup_first_name.value = null;
    signup_last_name.value = null;
    signup_email.value = null;
    signup_password.value = null;
    firebase.auth().createUserWithEmailAndPassword(User.email, User.password)
    .then(
        function(snapshot)
        {
            Database.child("Users/" + snapshot.uid).set(User);
            alert("Account Created Sucessuly!");
        }
    )
    .catch(
        function(error) 
        {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        }
    );
}













// 












var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var nameInput = document.getElementById("name");
var database = firebase.database();
var auth = firebase.auth();

function signup() {
    var email = emailInput.value;
    var password = passwordInput.value;
    var name = nameInput.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            var currentUser = {
                name: name,
                email: email,
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            location = 'login.html';
        })
        .catch(function (error) {
            // var a = error.message.value.length
            alert(error.message)
            // if (a = "The email  is already in use by another account."){
            //     location = "login.html"
            // }
            // else{
            //     // location = "#"
            //     alert(error.message)
            // }
        })



}

function login() {
    var email = emailInput.value;
    var password = passwordInput.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(function(user){
            location = 'home.html';
        })
        .catch(function(error){
            alert(error.message);
        })
}
var tag = document.getElementsByClassName("card-text")
    tag.onclick = function(){
    location = "https://www.google.com/"
} 
