// SELECTORS    
const todoInput = document.querySelector('.todo-input'); // this has the input todo
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo'); /* the div with the <select>'s class name */

// EVENT LISTENERS
// on a click, do the function called "addTodo"
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
// attach event listener to document/window, execute function if content loaded
document.addEventListener('DOMContentLoaded', getTodos);

// FUNCTIONS
function addTodo(event){
    event.preventDefault(); // prevent form from submitting
    /*
    below code will make multiple of:
    <div class="todo">
        <li></li>
        <button>delete</button>
        <button>completed   </button>
    </div>
    */
    //ToDo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create LI <li></li>
    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;  // uses the input value as the text   
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Add todo to local storage
    saveLocalTodos(todoInput.value);

    // Check mark button    <button>completed</button>
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; // when you want to use html instead of text
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    // Check trash button   <button>deleted</button>
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // when you want to use html instead of text
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // want to append these to the ul in the div with class="todo-contained"
    // Append to list
    todoList.appendChild(todoDiv);  //todoDiv appended eac of the buttons and the LI above, so it has everything
    
    // clear the form after inputting
    todoInput.value = "";
}

function deleteCheck(event){
    const item = event.target;  /* whatever is being clicked on */

    // delete the todo item
    if(item.classList[0] === "trash-btn"){    
        /*
        parentElement of trash-btn is the whole row:
        <div class="todo">
            <li class="todo-item"></li>
            <button class="completed-btn">
                <i class="fas fa-check"></i>
            </button>
            <button class="trash-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>        
        */
        const todo = item.parentElement;

        // Animation happens when item's trash button clicked, then item is really removed 
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })

    }

    // check mark
    if (item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {   // e.target.value is the menu option selected
            case "all": 
                // show all todos
                todo.style.display = "flex";    // display must match what the item has in css
                break;
            case "completed":
                // only the todos with class="completed"
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                // only the todos that dont have class="completed"
                if (!(todo.classList.contains("completed"))){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    // CHECK IF THERE ARE ALREADY TODOS
    let todos;
    // if no todos, make empty array, else get the array from local storage
    if (localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // push the new todo into the todos array in local storage
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    console.log('hello');
    // if no todos, make empty array, else get the array from local storage
    if (localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        //ToDo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // create LI <li></li>
        const newTodo = document.createElement('li');
        newTodo.innerText=todo;  // uses the current todo as text   
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Check mark button    <button>completed</button>
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'; // when you want to use html instead of text
        completedButton.classList.add("completed-btn");
        todoDiv.appendChild(completedButton);

        // Check trash button   <button>deleted</button>
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // when you want to use html instead of text
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // want to append these to the ul in the div with class="todo-contained"
        // Append to list
        todoList.appendChild(todoDiv);  //todoDiv appended eac of the buttons and the LI above, so it has everything
        
    })
}

function removeLocalTodos(todo){
    // if no todos, make empty array, else get the array from local storage
    if (localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // todo.children is the todo's [item, complete-btn, trash-btn], so want todo.children[0] (the item)
    const todoIndex = todo.children[0].innerText;
    
    // splice(<position of elem to be removed>, <how many elems to remove starting from index>)
    todos.splice(todos.indexOf(todoIndex), 1);

    // rewrite the todos array with the new one with the todo removed
    localStorage.setItem("todos", JSON.stringify(todos));
}