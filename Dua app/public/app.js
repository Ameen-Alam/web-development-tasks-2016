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
