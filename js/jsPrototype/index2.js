let taskList = [];
class Task {
  constructor(task) {
    this.task = task;
  }
}
function addTask() {
  let newTask = document.getElementById("newTask").value;
  let task = new Task(newTask);
  taskList.push(task);
  axios({
    url: "https://6388b2eca4bb27a7f78f1685.mockapi.io/taskList",
    method: "POST",
    data: task,
  })
    .then(function (res) {
      fetchTaskList(res.data);
      alert("Thêm task thành công");
    })
    .catch(function (err) {
      console.log(err);
    });
}
document.getElementById("addItem").addEventListener("click", addTask);

function renderTask(data) {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    data[i];
    html += `<li style="align-items: center;"> 
              ${data[i].id}:
              ${data[i].task}
              <div> 
              <button class="btn btn-light rounded-circle"><i class="fa-regular fa-circle-check text-success fs-7"></i></button>
              <button type="button" onclick="deleteTask(${data[i].id})"  class="btn btn-light rounded-circle deleteBtn"><i  class="fa-regular fa-trash-can text-danger fs-7"></i></button>
              </div>
            </li>`;
  }
  document.getElementById("todo").innerHTML = html;
}
function fetchTaskList() {
  axios({
    url: "https://6388b2eca4bb27a7f78f1685.mockapi.io/taskList",
    method: "GET",
  })
    .then(function (res) {
      taskList = [res.data];
      renderTask(res.data);
      console.log(taskList);
    })
    .catch(function (err) {
      console.log(err);
    });
}
window.onload = function () {
  fetchTaskList();
};


 function deleteTask(id) {
  axios({
    url: "https://6388b2eca4bb27a7f78f1685.mockapi.io/taskList/" + id,
    method: "DELETE",
  })
    .then(function (res) {
      fetchTaskList(res);
      renderTask(res.data)
    })
    .catch(function (err) {
      console.log(err);
    });
}
// tasks.forEach(function (task) {
  //   // Create html
  //   const taskDiv = document.createElement("div");
  //   taskDiv.classList.add("taskDiv");
  //   taskList.appendChild(taskDiv);
  //   const taskContent = document.createElement("li");
  //   taskContent.classList.add("newTask");
  //   taskContent.innerText = task;
  //   taskDiv.appendChild(taskContent);
  //   // btnGr
  //   const btnGroup = document.createElement("div");
  //   btnGroup.classList.add("btnGroup");
  //   taskDiv.appendChild(btnGroup);
  //   // btn Check
  //   const btnCheck = document.createElement("button");
  //   btnCheck.classList.add("btnCheck", "btn", "btn-light", "rounded-circle");
  //   btnCheck.id = "checkBtn";
  //   btnCheck.innerHTML = `<i id="checkIcon" class="fa-regular fa-circle-check text-danger  fs-6"></i>`;
  //   btnGroup.appendChild(btnCheck);
  //   // btn Del
  //   const btnDel = document.createElement("button");
  //   btnDel.id = "delBtn";
  //   btnDel.classList.add("btnDel", "btn", "btn-light", "rounded-circle");
  //   btnDel.innerHTML = `<i id="delIcon" class="fa-regular fa-trash-can text-danger fs-6"></i>`;
  //   btnGroup.appendChild(btnDel);
  // });