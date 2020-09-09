var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var nameInput = document.getElementById("name");
var database = firebase.database();
var auth = firebase.auth();
// singup
function signup() {
    var email = emailInput.value;
    var password = passwordInput.value;
    var name = nameInput.value;

    auth.createUserWithEmailAndPassword(email , password)
        .then(function (user) {
            return user.updateProfile({ displayName: name })
                .then(function () {
                    location = 'signin.html';
                })
    })
    .catch(function (error) {
        console.log(error.message);
    })
}

// function login() {
//     var email = emailInput.value;
//     var password = passwordInput.value;

//     auth.signInWithEmailAndPassword(email , password)
//         .then(function(user) {
//             location = "home.html"
//         })
//         .catch(function(error){
//             alert(error.message);
//         })
// }


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


// var emailInput = document.getElementById("email");
// var passwordInput = document.getElementById("password");
// var nameInput = document.getElementById("name");
// var database = firebase.database();
// var auth = firebase.auth();  // access authentication service

// function signup() {
//     var email = emailInput.value;
//     var password = passwordInput.value;
//     var name = nameInput.value;

//     auth.createUserWithEmailAndPassword(email, password) //promise
//         .then(function (user) {
//             return user.updateProfile({ displayName: name }) // updating info of user
//                 .then(function () {
//                     location = 'login.html';
//                 })
//         })
//         .catch(function (error) {
//             console.log(error.message);
//         })


// }

// function login() {
//     var email = emailInput.value;
//     var password = passwordInput.value;

//     auth.signInWithEmailAndPassword(email, password)
//         .then(function(user){
//             location = 'home.html';
//         })
//         .catch(function(error){
//             alert(error.message);
//         })
// }






// var emailInput = document.getElementById("email");
// var passwordlInput = document.getElementById("password");
// var nameInput = document.getElementById("name");
// var database = firebase.database();
// var auth = firebase.auth();

// document.getElementById("signup").onclick = function(){
//     var email = emailInput;
//     var password = passwordlInput;
//     var name = nameInput;
    
//     auth.createUserWithEmailAndPassword(email , password)
//         .then(function (user) {
//             return user.updateProfile({displayName : name })
//                 .then(function() {
//                     location = "signin.html";
//                 })
//         })
//         .catch(function (error) {
//             console.log(error.message)
//         })
// }


// document.getElementById("login").onclick = function() {
//     var email = emailInput;
//     var password = passwordlInput;

//     auth.signInUserWithEmailAndPassword(email , password)
//         .then(function(user) {
//             location = "home.html"
//         })
//         .catch(function(error){
//             alert(error.message)
//         })
// }
