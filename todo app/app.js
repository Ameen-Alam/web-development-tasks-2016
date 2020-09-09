document.getElementById("alert").style.display='none';
var database=firebase.database().ref("/");
var todoInpt=display('inputTodo');
var unOrderlist=display('list');
var editTodo=display('editTodo');
var updateBtn=display('updateButton');
var dateTime=new Date();
//Generic function to get values from id's

function display(fieldID)
{
    return document.getElementById(fieldID);
}

//fucntion to Add todo in the list
function AddTodo()
{

var todo={
item:todoInpt.value,
date:dateTime.toLocaleDateString()
};
//it checks weather todo is residing which is database name if its not it created and push what the current input is coming from
if(todoInpt.value !="")
    {
    database.child('todo').push(todo);
document.getElementById("alert").style.display='none';
}
else{
document.getElementById("alert").style.display='block';
    }
todoInpt.value="";
//console.log(todoInpt.value+" Added");
}
// childadded ye event listner koi event chala yea function call ho jae ga kuch bhi add hoa yea chl jae ga
database.child('todo').on("child_added",function(snapshot){
   
    var dbobj=snapshot.val()
    dbobj.id=snapshot.key
    render(dbobj)
})

function render(data)
{

var li=document.createElement("LI");
var liTable=document.createElement("TABLE");
var liTr=document.createElement("TR");

var liTd1=document.createElement("TD");
//liTable.appendChild(liTd);
li.setAttribute("class","list-group-item list-group-item-info ");
li.setAttribute("id",data.id);

var  tdText1=document.createTextNode(data.date);
liTd1.appendChild(tdText1);
var liTd2=document.createElement("TD");
var  tdText2=document.createTextNode(data.item);
liTd2.appendChild(tdText2);
liTable.appendChild(liTd1);
liTr.appendChild(liTd1);
liTable.appendChild(liTd2);
liTable.setAttribute("border","1");
liTr.appendChild(liTd2);
//var  liText=document.createTextNode(data.item);
liTable.appendChild(liTr)
var btnEditTag=document.createElement("BUTTON");
var btnEditText=document.createTextNode("Edit");
btnEditTag.setAttribute("class","btn btn-outline-secondary cursor float-right m-r5 btn-sty ");
btnEditTag.setAttribute("data-toggle","modal")
btnEditTag.setAttribute("data-target","#exampleModalLong");
btnEditTag.onclick=function(){
EditTodo(data.id,data.item);
}
btnEditTag.appendChild(btnEditText);
var btnDeleteTag=document.createElement("BUTTON");
var btnDeleteText=document.createTextNode("Delete");
btnDeleteTag.setAttribute("class","btn btn-outline-danger cursor float-right btn-sty ");
btnDeleteTag.appendChild(btnDeleteText);
li.appendChild(liTable);
btnDeleteTag.onclick=function(){
    removeTodo(data.id);
}
li.appendChild(btnDeleteTag);
li.appendChild(btnEditTag);

unOrderlist.appendChild(li);


}

function removeTodo(key)
{

database.child('todo/'+key).remove();

}

database.child('todo').on("child_removed",function(data){

    var liToRemove=document.getElementById(data.key);
    liToRemove.remove();
})

function EditTodo(key,item)
{


  var  todo={
        item:item,
        date:dateTime.toLocaleDateString()
        };
        var compare=document.getElementById(key);
       var check= compare.childNodes[0].firstChild.lastChild.innerText;
if(item==check)
editTodo.value=todo.item;
else
    editTodo.value=check;
updateBtn.onclick=function(){
      update(key);
  }
}
function update(key)
{
    var  todo={
        item:editTodo.value,
        date:dateTime.toLocaleDateString()
        };

            database.child('todo/'+key).update(todo);
            editTodo.value='';
}
database.child('todo').on("child_changed",function(data)
{ 
    // var dbobj=data.val()
    // dbobj.id=data.key
   
    // render(data);
    var deletedLi = document.getElementById(data.key);
    var others=deletedLi;
    var textSpan =  deletedLi.firstChild;
    textSpan = data.val().item;
    var liEdit=document.getElementById(data.key);
    liEdit.childNodes[0].firstChild.firstChild.innerText=dateTime.toLocaleDateString();    //dateTime.toLocaleDateString();
    liEdit.childNodes[0].firstChild.lastChild.innerText=textSpan;
   
})