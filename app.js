const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const addBtn = document.getElementById("addTaskBtn");
const clearBtn = document.getElementById("clearBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");
const msgTask = document.getElementById("status");

let tasks = JSON.parse(localStorage.getItem("tasks"))||[];
// to show on screen js object banane k lie render taks//

function renderList (list=tasks){
taskList.innerHTML="";

list.forEach((task , index)=>{
const li=document.createElement("li");
li.className="task-item"  ;
if (task.completed) {
      li.classList.add("completed");
    }

  li.innerHTML = `
      <span><strong>${index + 1}.</strong> ${task.title} - ${task.description}</span>
      <div class="actions">
        <button class="complete">${task.completed ? "Undo" : "Done"}</button>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;
    li.querySelector(".complete").addEventListener("click", () => toggleComplete(index));
    li.querySelector(".edit").addEventListener("click", () => editTask(index));
    li.querySelector(".delete").addEventListener("click", () => deleteTask(index));

    taskList.appendChild(li);
  });

  saveTasks();
}










