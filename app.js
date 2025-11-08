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
async function addTask() {
  const title = titleInput.value;
  const desc = descInput.value;

  if (!title) {
    showStatus(" Please enter a task title", "error");
    return;
  }

  showStatus(" Adding task...", "success"); 
  await delay(1500); //

  const newTask = {
    title,
    description: desc,
    completed: false,
  };

  tasks.push(newTask);
  titleInput.value = "";
  descInput.value = "";
  renderList();
  showStatus(" Task added successfully!", "success");
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function editTask(index) {
  const task = tasks[index];
  const newTitle = prompt("Edit title:", task.title);
  const newDesc = prompt("Edit description:", task.description);

  if (newTitle !== null) task.title = newTitle.trim() ;
  if (newDesc !== null) task.description = newDesc.trim();

  renderList();
  showStatus(" Task updated successfully!", "success");
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderList();
  showStatus(" Task deleted!", "error");
}
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderList();
  showStatus(" Task status updated!", "success");
}

function clearAll() {
  if (tasks.length === 0) {
    showStatus("⚠️ No tasks to clear!", "error");
    return;
  }
  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    renderList();
    showStatus("🧹 All tasks cleared!", "success");
  }
}

function searchTasks(e) {
  const text = e.target.value.toLowerCase();
  const filtered = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(text) ||
      t.description.toLowerCase().includes(text)
  );
  renderList(filtered);
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showStatus(msg, type) {
  msgTask.textContent = msg;
  msgTask.className = type;
  setTimeout(() => (msgTask.textContent = ""), 3000);
};

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAll);
searchInput.addEventListener("input", searchTasks);

renderList();
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderList();
  showStatus(" Task status updated!", "success");
}