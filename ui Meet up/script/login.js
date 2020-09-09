database = firebase.database().ref("/")
var userEmail = document.getElementById("userEmail")
var userPass = document.getElementById("userPass");
    document.getElementById("stop").addEventListener("submit",
    function submit(event){
        event.preventDefault()
        var user = {
            email:userEmail.value,
            password:userPass.value,
        }
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(function(success){
            database.child("user/" + success.uid).once("value",function(snapshot){
                var convert = (snapshot.val()); console.log(convert)
                convert.userId = success.uid;console.log(convert)
                localStorage.setItem("user",JSON.stringify(convert))
                location = "Home/home.html"
            })
        })
        .catch(function(error) {
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
    })
function createAccount(){
    window.location = "singup/singup.html"
}