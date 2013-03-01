var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";

  updateTaskList();
  saveToLocalStorage();
}

function editTask(index) {
  var newTaskText = prompt("Edit task:", tasks[index].text);

  if (newTaskText !== null) {
    tasks[index].text = newTaskText.trim();
    updateTaskList();
    saveToLocalStorage();
  }
}

function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  saveToLocalStorage();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskList();
  saveToLocalStorage();
}

function completeAllTasks() {
  var confirmed = confirm("Are you sure you want to complete all tasks?");
  if (confirmed) {
    tasks.forEach(function (task) {
      task.completed = true;
    });
    updateTaskList();
    saveToLocalStorage();
  }
}

function deleteAllTasks() {
  var confirmed = confirm("Are you sure you want to delete all tasks?");
  if (confirmed) {
    tasks = [];
    updateTaskList();
    saveToLocalStorage();
  }
}

function deleteCompletedTasks() {
  var confirmed = confirm(
    "Are you sure you want to delete all completed tasks?"
  );
  if (confirmed) {
    tasks = tasks.filter(function (task) {
      return !task.completed;
    });
    updateTaskList();
    saveToLocalStorage();
  }
}

function createTaskItem(task) {
  var taskItem = document.createElement("li");
  taskItem.innerText = task.text;

  if (task.completed) {
    taskItem.classList.add("completed");
  }

  var actionButtons = document.createElement("div");
  actionButtons.classList.add("action-buttons");

  var toggleButton = document.createElement("button");
  toggleButton.innerText = "Toggle";
  toggleButton.onclick = function () {
    toggleTaskStatus(tasks.indexOf(task));
  };

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.onclick = function () {
    editTask(tasks.indexOf(task));
  };

  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.onclick = function () {
    deleteTask(tasks.indexOf(task));
  };

  actionButtons.appendChild(toggleButton);
  actionButtons.appendChild(editButton);
  actionButtons.appendChild(deleteButton);

  taskItem.appendChild(actionButtons);

  return taskItem;
}

function updateTaskList() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    var taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
  });
}

updateTaskList();
