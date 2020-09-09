function doFirst(){
    var button = document.getElementById("button");
    button.addEventListener("click" , save , false);
    display();
}

function save(){
    var key = document.getElementById("key").value;
    var value = document.getElementById("value").value;
    sessionStorage.setItem(key, value);
    display();
    key.value="";
    value.value=""
}

function display(){
    var display_data = document.getElementById("display_data")
    display_data.innerHTML = "";
    for(var i = 0; i < sessionStorage.length; i++){
        var a = sessionStorage.key(i);
        var b = sessionStorage.getItem(a);
        display_data.innerHTML += a+" - " + b + "<br>"; 
    }
}

function clear(){
    sessionStorage.clear();
    location.reload();
}



window.addEventListener("load",doFirst,false)