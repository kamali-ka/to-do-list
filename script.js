
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add('fade-in');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

       
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleComplete(index));
        
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(index));

        li.prepend(checkbox);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}


function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
}


function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}


function deleteTask(index) {
    const li = todoList.children[index];
    li.classList.add('fade-out');
    setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }, 500); 
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});


renderTasks();
