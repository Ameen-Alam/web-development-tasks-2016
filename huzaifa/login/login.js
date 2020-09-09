  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC5nvczDBJ900WpjicsqTMuRzY2iZ15zbg",
    authDomain: "raisersbuilders.firebaseapp.com",
    databaseURL: "https://raisersbuilders.firebaseio.com",
    projectId: "raisersbuilders",
    storageBucket: "raisersbuilders.appspot.com",
    messagingSenderId: "319373610910"
  };
  firebase.initializeApp(config);
// 
console.log("huzaifa");
var database = firebase.database().ref("/");
var inEmail = document.getElementById("email");
var inPass = document.getElementById("password");

document.getElementById("stop").addEventListener("submit",

    function submit(event) {
        event.preventDefault();
        var user = {
            email: inEmail.value,
            password: inPass.value,
        };

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(function (success) {

                // console.log(success.uid);

                database.child('user/' + success.uid).once("value", function (snapshot) {
                    console.log(snapshot.val());
                    localStorage.setItem("user", JSON.stringify(snapshot.val()));

                    alert(
                        'Good job!',
                        'Log In Successful',
                        'success'
                    )
                    setTimeout(function () {
                        location = "../dashboard/dash.html";
                    }, 2000);

                });

            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert(
                        'OOppss!..',
                        "Wrong Password",
                        'error'
                    )
                } else {
                    alert(
                        'OOppss!..',
                        errorMessage,
                        "error"
                    )
                }
                console.log(error);
            });


    });