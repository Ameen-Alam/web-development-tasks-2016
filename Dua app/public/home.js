var user = JSON.parse(localStorage.getItem('currentUser'));
var nameRow = document.getElementById('nameRow'); 
var emailRowail = document.getElementById('emailRow');
var sender = document.getElementById('sender');
var comment = document.getElementById('commentBox');
var database = firebase.database().ref();

nameRow.innerHTML ="Hello " + user.name +" !";
emailRow.innerHTML = user.email;


function submit(){
    var post = {
        sender: sender.value,
        dua: comment.value
    }
    sender.value = '';
    comment.value = '';

    database.child('posts').push(post);
}

function signOut(){
    firebase.auth().signOut().then(function() {
        location = 'login.html';
        console.log('Signed Out')
    }, function(error){
        console.error('Sign Out Error' , error);
    });
    // database.auth().JSON
}