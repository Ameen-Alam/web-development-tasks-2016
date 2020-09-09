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

  let sign_in = document.getElementById('sign_in');
  let pSignUp = document.getElementById('pSignUp');
  let inEmail = document.getElementById('email');
  let inPpassword = document.getElementById('password');
  let signIn = document.getElementById('signIn');

  /*signIn.onclick = function(){
      if(email.value === ""){
          swal("Opps email canno be NULL")
      }
      else if(password.value === ""){
          swal("Opps password canno be NULL")
      } else{



      }
      
  }//sigin
  */
  signIn.onclick = function submit(event) {
          event.preventDefault();
          var user = {
              email: inEmail.value,
              password: inPpassword.value
          };
          auth.signInWithEmailAndPassword(user.email, user.password)
              .then(function(success) {
                  database.child('user/' + success.uid).once('value', function(snapshot) {
                      console.log(snapshot.val());
                      localStorage.setItem('user', JSON.stringify(snapshot.val()));

                      swal("Good Job Lg In Success")
                      setTimeout(function() {
                          location = "../event/event.html"
                      }, 2000)
                  })
              })
              .catch(function(error) {
                  // Handle Error
                  let errorCode = error.code;
                  let errorMessage = error.message;
                  if (errorMessage === "auth/wrong-password") {
                      swal("Opps Wrong Password Error")
                  } else {
                      swal("Ooops " + errorMessage + " error")
                  }
                  console.log(error)
              })
      } // signIn



  pSignUp.onclick = function() {
      location = "../index.html"
  }