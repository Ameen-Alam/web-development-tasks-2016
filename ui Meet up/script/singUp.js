// console.log(database)
function submit (){
    var database = firebase.database().ref("/")
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var userEmail = document.getElementById("userEmail");
    var pass = document.getElementById("UserPassword")

    var user = {
        fName: firstName.value,
        LName: lastName.value,
        email:userEmail.value,
        password:pass.value,
    }
    console.log(user)

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(function(res){
        console.log(res)
        database.child("user/" + res.uid).set(user).then(function(){
        window.location = "../index.html";

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
}



