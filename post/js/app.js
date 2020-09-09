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

 let database = firebase.database().ref('/');
 let auth = firebase.auth();
 // let local _localStorage = 

 // All Sign up Pages ID IDsssssss

 let sign_up = document.getElementById('sign_up'); // Div sign_up
 let firstName = document.getElementById('firstName');
 let lastName = document.getElementById('lastName');
 let mail = document.getElementById('email');
 let pswrd = document.getElementById('password');
 let confirmPswrd = document.getElementById('confirmPassword');
 let agee = document.getElementById('age');
 let mbl = document.getElementById('mobile');
 let dathOfBirth = document.getElementById('dob');
 let signUp = document.getElementById('signUp'); // button Sign up
 let pLogin = document.getElementById('pLogin'); // button going to Login Page
 // 
 signUp.onclick = function() {
         var fName = firstName.value;
         var lName = lastName.value;
         var email = mail.value;
         var password = pswrd.value;
         var confirmPassword = confirmPswrd.value;
         var age = agee.value;
         var mobil = mbl.value;
         var dob = dathOfBirth.value;

         if (fName === "") {
             firstName.focus();
             swal(
                 "Ooops!",
                 'First Name Cannot be NULL',
                 'error'
             )
         } else if (lName === "") {
             lastName.focus();
             swal(
                 "Ooops!",
                 'Last Name Cannot be NULL',
                 'error'
             )
         } else if (email === "") {
             mail.focus();
             swal(
                 "Ooops!",
                 'Email Cannot be NULL',
                 'error'
             )
         } else if (password === "" | confirmPassword === "") {
             pswrd.focus();
             swal(
                 "Ooops!",
                 'Password Cannot be NULL',
                 'error'
             )
         } else if (password !== confirmPassword) {
             pswrd.focus();
             confirmPswrd.focus();
             swal(
                 "Ooops!",
                 'Password Not match',
                 'error'
             )
         } else if (mobil === "") {
             mbl.focus();
             swal(
                 "Ooops!",
                 'Cell Num Cannot be NULL',
                 'error'
             )
         } else {
             let signUpUser = {
                     name: fName + " " + lName,
                     gmail: email,
                     pword: password,
                     aGe: age,
                     cell: mobil,
                     dOfb: dob
                 } // objext

             auth.createUserWithEmailAndPassword(signUpUser.gmail, signUpUser.pword)
                 .then(function(res) {
                     signUpUser.userID = res.uid;
                     database.child('user/' + res.uid).set(signUpUser)
                         .then(function() {
                             swal(
                                 'Good Job',
                                 'Sign Up Successful',
                                 'success'
                             )
                             setTimeout(function() {
                                 location = "login/login.html"
                             }, 2000)
                         })
                     console.log(res)
                     fName = "";
                     lName = "";
                     email = "";
                     password = "";
                     confirmPassword = "";
                     age = "";
                     mobil = "";
                     dob = ""
                 })
                 .catch(function(error) {
                     // Handle Error Here
                     let errorCode = error.code;
                     let errorMessage = error.message;
                     if (errorCode == 'auth/weak-password') {
                         swal(
                             'Ooops',
                             'Your Password is to weak',
                             'error'
                         )
                     } else {
                         swal(
                             'Ooops',
                             errorMessage,
                             'error'
                         )
                     } // else
                     console.log(error)
                 })
         } //else Main

     } // sign up function


 // Going login page button

 pLogin.onclick = function() {
     location = "login/login.html"
 }