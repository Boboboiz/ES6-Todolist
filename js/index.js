// Selector
const taskInput = document.querySelector("#newTask");
const addTaskBtn = document.querySelector("#addItem");
const taskList = document.querySelector("#todo");
const taskComplete = document.querySelector("#completed");
const sortBtnAz = document.querySelector("#sortAz");
const sortBtnZa = document.querySelector("#sortZa");
// const renderComplete = document.querySelector("#renderComplete")
// Event Listener

document.addEventListener("DOMContentLoaded", function () {
  getLocal();
  getLocalComplete();
});
addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", taskDelAndCheck);
taskComplete.addEventListener("click", taskDelAndCheck);
sortBtnAz.addEventListener("click", sortTaskAz);
sortBtnZa.addEventListener("click", sortTaskZa);
// renderComplete.addEventListener("click", filterCompleteTask)
// Function

function addTask(event) {
  // prvent form when click submit
  event.preventDefault();
  if (!taskInput.value) return alert("Không có task để thêm");
  // Create html
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("taskDiv");
  taskList.appendChild(taskDiv);
  const taskContent = document.createElement("li");
  taskContent.classList.add("newTask");
  taskContent.innerText = taskInput.value;
  taskDiv.appendChild(taskContent);
  // btnGr
  const btnGroup = document.createElement("div");
  btnGroup.classList.add("btnGroup");
  taskDiv.appendChild(btnGroup);
  // btn Check
  const btnCheck = document.createElement("button");
  btnCheck.classList.add("btnCheck", "btn", "btn-light", "rounded-circle");
  btnCheck.id = "checkBtn";
  btnCheck.innerHTML = `<i id="checkIcon" class="fa-regular fa-circle-check text-danger fs-6"></i>`;
  btnGroup.appendChild(btnCheck);
  // btn Del
  const btnDel = document.createElement("button");
  btnDel.id = "delBtn";
  btnDel.classList.add("btnDel", "btn", "btn-light", "rounded-circle");
  btnDel.innerHTML = `<i id="delIcon" class="fa-regular fa-trash-can text-danger fs-6"></i>`;
  btnGroup.appendChild(btnDel);
  // save Local
  saveTaskLocal(taskInput.value);
  // reset input
  taskInput.value = "";
}

function taskDelAndCheck(e) {
  const btnWasClicked = e.target;
  const taskTarget = btnWasClicked;
  const completeArr = [];
  // Del
  if (btnWasClicked.id === "delBtn") {
    taskTarget.parentElement.parentElement.remove();
    deleteTaskLocal(taskTarget.parentElement.parentElement);
  } else if (btnWasClicked.id === "delIcon") {
    taskTarget.parentElement.parentElement.parentElement.remove();
    deleteTaskLocal(taskTarget.parentElement.parentElement.parentElement);
  }
  if (btnWasClicked.id === "delBtnComplete") {
    taskTarget.parentElement.parentElement.remove();
    deleteTaskCompleteLocal(taskTarget.parentElement.parentElement);
  } else if (btnWasClicked.id === "delIconComplete") {
    taskTarget.parentElement.parentElement.parentElement.remove();
    deleteTaskCompleteLocal(
      taskTarget.parentElement.parentElement.parentElement
    );
  }
  // check
  if (btnWasClicked.id === "checkBtn") {
    completeArr.push(taskTarget.parentElement.parentElement);
    // duyệt mảng lưu complete vào local
    completeArr.forEach((complete) => {
      const taskIndex = complete.children[0].innerText;
      // delete task vừa click ở storage tasks
      deleteTaskLocal(complete);
      let completeLocal;
      // check Local have data
      if (!localStorage.getItem("complete")) {
        completeLocal = [];
      } else {
        completeLocal = JSON.parse(localStorage.getItem("complete"));
      }
      completeLocal.push(taskIndex);
      localStorage.setItem("complete", JSON.stringify(completeLocal));

      // render complete task
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("taskDiv");
      taskComplete.appendChild(taskDiv);
      const taskContent = document.createElement("li");
      taskContent.classList.add("newTask");
      taskContent.style.background = "#f5f8f9";
      taskContent.innerText = taskIndex;
      taskDiv.appendChild(taskContent);
      // btnGr
      const btnGroup = document.createElement("div");
      btnGroup.classList.add("btnGroup");
      taskDiv.appendChild(btnGroup);
      // span done
      const spanCheck = document.createElement("span");
      spanCheck.classList.add("text-success", "fs-7", "fw-bold", "ms-2");
      spanCheck.innerText = "Done";
      btnGroup.appendChild(spanCheck);
      // btn del
      const btnDel = document.createElement("button");
      btnDel.id = "delBtnComplete";
      btnDel.classList.add("btnDel", "btn", "btn-light", "rounded-circle");
      btnDel.innerHTML = `<i id="delIconComplete" class="fa-regular fa-trash-can text-danger fs-6"></i>`;
      btnGroup.appendChild(btnDel);
    });
    taskTarget.parentElement.parentElement.remove();
  }
}

function saveTaskLocal(task) {
  let tasks;
  // check Local have data
  if (!localStorage.getItem("tasks")) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getLocalComplete() {
  let completeLocal;
  // check Local have data
  if (!localStorage.getItem("complete")) {
    completeLocal = [];
  } else {
    completeLocal = JSON.parse(localStorage.getItem("complete"));
  }
  completeLocal.forEach((complete) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("taskDiv");
    taskComplete.appendChild(taskDiv);
    const taskContent = document.createElement("li");
    taskContent.classList.add("newTask");
    taskContent.style.background = "#f5f8f9";
    taskContent.innerText = complete;
    taskDiv.appendChild(taskContent);
    // btnGr
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btnGroup");
    taskDiv.appendChild(btnGroup);
    // span done
    const spanCheck = document.createElement("span");
    spanCheck.classList.add("text-success", "fs-7", "fw-bold", "ms-2");
    spanCheck.innerText = "Done";
    btnGroup.appendChild(spanCheck);
    // btn del
    const btnDel = document.createElement("button");
    btnDel.id = "delBtnComplete";
    btnDel.classList.add("btnDel", "btn", "btn-light", "rounded-circle");
    btnDel.innerHTML = `<i id="delIconComplete" class="fa-regular fa-trash-can text-danger fs-6"></i>`;
    btnGroup.appendChild(btnDel);
  });
}
function getLocal() {
  let tasks;
  // check Local have data
  if (!localStorage.getItem("tasks")) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  renderLocal(tasks);
}
function renderLocal(data) {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    data[i];
    html += `<div class="taskDiv">
                <li class="newTask">${data[i]}</li>
                <div class="btnGroup">
                <button id="checkBtn" class="btnCheck btn btn-light rounded-circle "><i id="checkIcon" class="fa-regular fa-circle-check text-danger  fs-6"></i></button>
                <button id="delBtn" class="btnDel btn btn-light rounded-circle "><i id="delIcon" class="fa-regular fa-trash-can text-danger fs-6"></i></button>
                </div>
            </div>`;
  }
  taskList.innerHTML = html;
}
function deleteTaskLocal(task) {
  // task
  let tasks;
  if (!localStorage.getItem("tasks")) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const taskIndex = task.children[0].innerText;
  tasks.splice(tasks.indexOf(taskIndex), 1);
  console.log(taskIndex);
  // update on local
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // complete
}

function deleteTaskCompleteLocal(task) {
  let complete;
  if (!localStorage.getItem("complete")) {
    complete = [];
  } else {
    complete = JSON.parse(localStorage.getItem("complete"));
  }
  const taskIndex = task.children[0].innerText;
  complete.splice(complete.indexOf(taskIndex), 1);
  console.log(taskIndex);

  // update on local
  localStorage.setItem("complete", JSON.stringify(complete));
}

function sortTaskAz() {
  let tasks;
  // check Local have data
  if (!localStorage.getItem("tasks")) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.sort((a,b)=> {
    return a.localeCompare(b) // sort task có unikey
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderLocal(tasks);
}
function sortTaskZa() {
  let tasks;
  // check Local have data
  if (!localStorage.getItem("tasks")) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.sort((a,b)=> {
    return b.localeCompare(a)
  })
  console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderLocal(tasks);
}

