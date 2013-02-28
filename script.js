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

function updateTaskList() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var taskItem = document.createElement("li");
    taskItem.innerText = tasks[i].text;

    if (tasks[i].completed) {
      taskItem.classList.add("completed");
    }

    var toggleButton = document.createElement("button");
    toggleButton.innerText = "Toggle";
    toggleButton.onclick = (function (i) {
      return function () {
        toggleTaskStatus(i);
      };
    })(i);

    taskItem.appendChild(toggleButton);

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = (function (i) {
      return function () {
        deleteTask(i);
      };
    })(i);

    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  }
}

updateTaskList();
