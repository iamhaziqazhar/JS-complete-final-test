const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const addBtn = document.getElementById("addTaskBtn");
const clearBtn = document.getElementById("clearBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");
const msgTask = document.getElementById("status");

let tasks = JSON.parse(localStorage.getItem("tasks"))||[];

