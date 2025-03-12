const todoInput = document.querySelector(".entry-input"); 
const todoButton = document.querySelector(".entry-button"); 
const todoList = document.querySelector(".todo-list"); 

document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click", addTodo); 

function addTodo(event) {
    event.preventDefault(); 

    const todoDiv = document.createElement("div"); 
    todoDiv.classList.add("todo"); 
    const newTodo = document.createElement("li"); 
    newTodo.textContent = todoInput.value; 
    newTodo.classList.add("todo-item"); 
    todoDiv.appendChild(newTodo);
    todoDiv.addEventListener("click", deleteCheck); 

    saveLocalTodos(todoInput.value); 

    const completedButton = document.createElement("button"); 
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'; 
    completedButton.classList.add("complete-btn"); 
    todoDiv.appendChild(completedButton);
    
    const trashButton = document.createElement("button"); 
    trashButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'; 
    trashButton.classList.add("trash-btn"); 
    todoDiv.appendChild(trashButton);

    todoInput.value = ""; 

    todoList.appendChild(todoDiv); 
}

function deleteCheck(e){
    const item = e.target; 

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement; 

        todo.classList.add("fall"); 
        removeLocalTodos(todo); 
        todo.addEventListener("transitionend", function(){
            todo.remove(); 
        }); 
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement; 
        todo.classList.toggle("completed"); 
    }
}

function saveLocalTodos(todo) {
    let todos; 
    if(localStorage.getItem("todos") === null) {
        todos = []; 
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    } 
    todos.push(todo); 
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos(){
    let todos; 
    if(localStorage.getItem("todos") === null) {
        todos = []; 
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); 
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div"); 
        todoDiv.classList.add("todo"); 
        const newTodo = document.createElement("li");
        newTodo.innerText = todo; 
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo); 
        todoDiv.addEventListener("click", deleteCheck); 

         const completedButton = document.createElement("button"); 
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'; 
    completedButton.classList.add("complete-btn"); 
    todoDiv.appendChild(completedButton);
    
    const trashButton = document.createElement("button"); 
    trashButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'; 
    trashButton.classList.add("trash-btn"); 
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv); 
    });      
}

function removeLocalTodos(todo){
    let todos; 
    if(localStorage.getItem("todos") === null){
        todos = []; 
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); 
    }

    const todoIndex = todo.children[0].innerText; 
    todos.splice(todos.indexOf(todoIndex), 1); 
    localStorage.setItem("todos", JSON.stringify(todos)); 
}