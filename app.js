//selectors
const todoSearch = document.querySelector(".search-input")
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const searchButton = document.querySelector(".search-button")
const filterOption= document.querySelector(".filter-todo")
const tagContainer=document.querySelector(".tag-container")
const input=document.querySelector(".tag-input")

//event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkedTodo)
searchButton.addEventListener("click", searchTodo);
filterOption.addEventListener("click",filterTodo)
input.addEventListener('keyup', addTag)
document.addEventListener("DOMContentLoaded", getTodos)
//function
function listTagHtml({tagText,date}){
  const tagList= document.createElement("div")
  tagList.classList.add("tag-list")
  const tagDiv= document.createElement("div")
  tagDiv.classList.add("tag")
  tagDiv.innerText=tagText
  const tagDelete = document.createElement("button")
  tagDelete.classList.add("tag-delete")
  tagDelete.innerHTML='<i class="fa fa-times"></i>'
  tagDelete.onclick=()=>deletetags(date.valueOf())
  tagDiv.appendChild(tagDelete)
  tagList.appendChild(tagDiv)
  return tagList
}
function reset(){
  document.querySelectorAll(".tag").forEach(function(tag){
    tag.parentElement.removeChild(tag)
  })
}
function resetTodo(){
  document.querySelectorAll(".todo").forEach(function(todo){
    todo.parentElement.removeChild(todo)
  })
}
let searchArr=[]
function searchTodoByTags(tags){
  console.log(tags)
  if(todoArr.length>0){
    console.log(tags)
    if(tags.length>0){
      searchTodoArr=[]
      searchTodoArr= todoArr.filter(todo=>{
        if(todo.todo.includes(tags)){
          searchArr.push(todo)
          return todo
        } 
      })
      console.log(searchArr)
      render(searchArr)
      searchTodoArr=[]
     }
     else if(!tags.length>0){
       render(todoArr)
     }
    }
      
}
function deletetags(date){
let deletetags=tagArr.filter(tag=>tag.date.valueOf()!==date)
reset()
deletetags.slice().reverse().map(tag=>tagContainer.prepend(listTagHtml(tag)))
tagArr=deletetags


}
let tagArr=[]
function addTag(e){
  if(e.key==="Enter"){
    if(input.value==="")
    render(todoArr)
    else{
      let obj={}
     obj.tagText=input.value
     obj.date= new Date()
     tagArr.push(obj)
     console.log(obj)
      let arr=[]
      arr.push(input.value)
      reset()
      tagArr.slice().reverse().map(tag=>tagContainer.prepend(listTagHtml(tag)))
      searchTodoByTags(arr)
      input.value=''
      
    }
  }
}

let todoArr = []
function addTodo(e) {
    e.preventDefault();
    let todoObj = {}
    let todoValue = todoInput.value
    let date = new Date();
    todoObj.todo = todoValue
    todoObj.date = date
    todoArr.push(todoObj)
    console.log(todoArr)
    render(todoArr)
    todoInput.value=""

}


const render = (arrOfList) => {
    resetTodo()
    localStorage.setItem("todos",JSON.stringify(arrOfList))
    const todoTableContent = arrOfList.map((array) => todoList.appendChild(listHtml(array)))
}

const listHtml=({todo,date})=>{
    const todoDiv = document.createElement("div")
    todoDiv.classList.add('todo')
    const newTodo = document.createElement("li")
    console.log(newTodo.innerText)
    newTodo.classList.add('todo-item')
    newTodo.innerText=todo
    console.log(newTodo.innerText)
    todoDiv.appendChild(newTodo)
    const checkedButton = document.createElement("button")
    checkedButton.classList.add('checked-btn')
    checkedButton.innerHTML='<i class="fas fa-check"></i>'
    todoDiv.appendChild(checkedButton)
    const editButton = document.createElement("button")
    editButton.classList.add('edit-btn')
    editButton.innerHTML='<i class="far fa-edit"></i>'
    editButton.onclick=()=>editTodo(date.valueOf())
    todoDiv.appendChild(editButton)
    const deleteButton = document.createElement("button")
    deleteButton.classList.add('delete-btn')
    deleteButton.innerHTML='<i class="fas fa-trash"></i>'
    deleteButton.onclick=()=>deleteTodo(date.valueOf())
    todoDiv.appendChild(deleteButton)
    return todoDiv
    
 }
 


 const editTodo=(date)=>{
    let index= todoArr.findIndex(element=>element.date.valueOf()===date)
   console.log(index)
   let editValue= prompt('edit todo',todoArr[index].todo)
   todoArr[index].todo=editValue
  //  console.log(todoArr)
   render(todoArr)
 }

function deleteTodo(date){
   let deletedArr= todoArr.filter(element=>element.date.valueOf()!==date)
   render(deletedArr)
   todoArr=deletedArr
 }

 function checkedTodo(e){
     const item = e.target
     if (item.classList[0] === "checked-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
      }
      // else if(item.classList[0]==="delete-btn"){
      //   const todo=item.parentElement;
      //   todo.remove()
      // }
      // else if (item.classList[0]==="edit-btn"){
      //  const todo= item.parentElement
      //   let editValue= prompt('edit todo',todo.firstChild.innerText)
      //   todo.firstChild.innerText=editValue
      // }
 }
 
let searchTodoArr
 function searchTodo(e){
   searchTodoArr=''
  e.preventDefault()
  let todoSearchValue=todoSearch.value
  todoSearchValue=todoSearchValue
   if(todoArr.length>0){
    if(todoSearch.value=""){
      render(todoArr)
    }
    else{
      searchTodoArr= todoArr.filter(todo=>{
        if(todo.todo.includes(todoSearchValue))
        return todo
      })
      console.log(searchTodoArr)
      render(searchTodoArr)
      todoSearch.value=todoSearchValue
     }
    }
  }
  function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
      switch(e.target.value){
        case "all":{
          todo.style.display="flex"
          break;
        }
        case "completed":{
          if(todo.classList.contains("completed")){
            todo.style.display="flex"
          }
          else{
            todo.style.display="none"
          }
          break;
        }
        case "working":{
          if(!todo.classList.contains("completed")){
            todo.style.display="flex"
          }
          else{
            todo.style.display="none"
          }
          break;
        }
      }
    })
  }

  // function saveLocalTodos(todo) {
  //   let todos;
  //   if (localStorage.getItem("todos") === null) {
  //     todos = [];
  //   } else {
  //     todos = JSON.parse(localStorage.getItem("todos"));
  //   }
  //   todos.push(todo);
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }
  // function removeLocalTodos(date) {
  //   let todos;
  //   if (localStorage.getItem("todos") === null) {
  //     todos = [];
  //   } else {
  //     todos = JSON.parse(localStorage.getItem("todos"));
  //   }
  //   todos= todos.filter(element=>element.date.valueOf()!==date)
  // }
  // function editlocalTodo(date){
  //   let todos;
  //   if (localStorage.getItem("todos") === null) {
  //     todos = [];
  //   } else {
  //     todos = JSON.parse(localStorage.getItem("todos"));
  //   }
  //     let index= todos.findIndex(element=>element.date.valueOf()===date)
  //    let editValue= prompt('edit todo',todos[index].todo)
  //    todos[index].todo=editValue
  //   //  console.log(todoArr)
  //    render(todos)
  //  }
  
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todoArr=todos
      render(todos)
  }
 