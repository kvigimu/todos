// let arr = [
//   { id: 123, task: "buy milk" },
//   { id: 321, task: "drink milk" },
//   { id: 234, task: "recycle milk" },
//   { id: 423, task: "reuse package" },
// ]; reikalingi buvo patikrinti ar veikiam, mock data

let sortByname = false;
let sortByDate = false;

var input = document.getElementById("taskInput");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault;
    addTask();
  }
});
//funkcija sukuriam ir enteriui ir buttonui
function addTask() {
  const inputValue = document.getElementById("taskInput").value;
  const newTask = {
    id: new Date().getTime(),
    task: inputValue,
  };
  if (inputValue === "") {
    return alert("empty input");
  } else {
    const lsAarr = JSON.parse(window.localStorage.getItem("tasks"));
    let arr = lsAarr ? lsAarr : [];
    arr.push(newTask);
    window.localStorage.setItem("tasks", JSON.stringify(arr));
  }

  drawTaskList();
}
//function to change singleTask.id to standart date
const formatDate = (date) => {
  const addZero = (num) => (num < 10 ? "0" + num : num);
  const h = addZero(new Date(date).getHours());
  const min = addZero(new Date(date).getMinutes());
  const d = addZero(new Date(date).getUTCDate());
  const mo = new Date(date).getMonth();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let name = month[mo];
  const y = new Date(date).getFullYear();
  return `${h}:${min} ${d} ${name} ${y}`;
};

document.getElementById("addBtn").addEventListener("click", addTask);

const drawTaskList = () => {
  const taskList = document.getElementById("tasksList");
  taskList.innerHTML = null; // be jo detusi visi seni task + naujas supushintas i array

  // get data from local storage
  const lsAarr = JSON.parse(window.localStorage.getItem("tasks"));
  let arr = lsAarr ? lsAarr : [];
  if (sortByName) {
    arr.sort((a, b) => (a.task > b.task ? 1 : b.task > a.task ? -1 : 0));
  }
  if (sortByDate) {
    arr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
  }

  arr.forEach((singleTask, ind) => {
    // arr.forEach gali pasiekti value, ind ir arr, foreach nieko negrazina, tik pereina per kiekviena itema, .map grazina
    //creating elements
    const myLi = document.createElement("li");
    const myInput = document.createElement("input");
    const myLabel = document.createElement("label");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    // date group
    const myDate = document.createElement("div");
    myDate.textContent = formatDate(singleTask.id);

    //adding styles
    myLi.className = "container list-group-item";
    myLi.style.display = "flex";
    myInput.className = " col-2 form-check-input me-1";
    myLabel.className = " col-5 form-check-label";
    deleteBtn.className = " col-1 btn btn-danger";
    deleteBtn.style.margin = "1px";
    editBtn.className = " col-1 btn btn-info";
    editBtn.style.margin = "1px";
    myDate.className = " col-3";

    //adding attributes
    //input
    myInput.setAttribute("type", "checkbox");
    myInput.setAttribute("id", ind);

    //label
    myLabel.setAttribute("for", ind);
    myLabel.textContent = singleTask.task;

    //delete btn
    deleteBtn.setAttribute("type", "button");
    deleteBtn.textContent = "delete";

    //edit btn
    editBtn.setAttribute("type", "button");
    editBtn.textContent = "edit";

    //append childs
    myLi.append(myInput, myLabel, myDate, editBtn, deleteBtn);
    taskList.append(myLi);
    //delete task
    deleteBtn.addEventListener("click", () => {
      arr = arr.filter((filterTask) => filterTask.id !== singleTask.id); //filter nekeicia originalaus array, bet grazina nauja array kuri ispesiam tinklapyje
      window.localStorage.setItem("tasks", JSON.stringify(arr));
      drawTaskList();
    });

    editBtn.addEventListener("click", () => {
      const updatedTask = prompt("Edit your task, please", singleTask.task);

      if (updatedTask?.trim()) {
        const newTask = {
          ...singleTask, // ... (spread operator- ikelia array i kita array, arr[1,23,33], let arr2 [...arr, 15,44,55] =[1,23,33,15,44,55]
          //ta pati galima padaryti su objektu ..{...obj1, name: "pablo"} new obj bus pablo
          task: updatedTask,
        };

        arr.splice(ind, 1, newTask); // nuo kurio id reikia pradeti pakeitimus, 1 iteracija; deleteCount (0- jei nori prideti, 1,2... kiek item nori istrinti), ka ideti)
        window.localStorage.setItem("tasks", JSON.stringify(arr));
        drawTaskList();
      }
    });
  });
};
document.getElementById("sortByName").addEventListener("click", function () {
  sortByDate = false;
  sortByName = !sortByName;
  document.getElementById("sortByDate").classList.remove("active");
  sortByName ? this.classList.add("active") : this.classList.remove("active");
  drawTaskList();
});
drawTaskList();
document.getElementById("sortByDate").addEventListener("click", function () {
  sortByName = false;
  sortByDate = !sortByDate;
  document.getElementById("sortByName").classList.remove("active");
  sortByDate ? this.classList.add("active") : this.classList.remove("active");
  drawTaskList();
});
drawTaskList();
