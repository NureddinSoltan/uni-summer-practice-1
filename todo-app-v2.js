const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");


let editId,
isEditedTask = false,
// getting localstorage todo-list
todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});




function showTodo(filters) {
    let li = "";
    if(todos){
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filters == todo.status || filters =="all") {
                li += `<li class="task">
                        <label for="${id}">
                            <input type="checkbox" onclick="updateStatus(this)" id="${id}" ${isCompleted}>
                            <p class = "${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id}, '${todo.name}')"><i class="fa-regular fa-pen-to-square"></i>Edit</li>
                                <li onclick='deleteTask(${id}, "${filters}")'><i class="fa-regular fa-trash-can"></i>Delete</li>
    
                            </ul>
                        </div>
                    </li>`;
            }
        });
    }
    taskBox.innerHTML = li || `<span> You don't have any task here </span>`;
}
showTodo("all");

function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    });
}


function editTask(taskId, taskName) {
    editId = taskId;
    taskInput.value = taskName;
    isEditedTask = true;
}


function deleteTask(deleteId, filters) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filters);
}

clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
});



function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status ="completed";
    }else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status ="pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isEditedTask) {
            // let todos = localStorage.getItem("todo-list");
            if(!todos) {
                todos = [];
            }
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }

        taskInput.value ="";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});