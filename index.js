let arr = [
  { id: 123, task: "buy milk" },
  { id: 321, task: "drink milk" },
  { id: 234, task: "recycle milk" },
  { id: 423, task: "reuse package" },
];

document.getElementById("addBtn").addEventListener("click", () => {
  const inputValue = document.getElementById("taskInput").value;
  const newTask = {
    id: new Date().getTime(),
    task: inputValue,
  };
  if (inputValue === "") {
    return alert("empty input");
  } else {
    arr.push(newTask);
  }
  drawTaskList();
});

const drawTaskList = () => {
  const taskList = document.getElementById("tasksList");
  taskList.innerHTML = null;
  arr.forEach((value, ind) => {
    // arr.forEach gali pasiekti value, ind ir arr
    //creating elements
    const myLi = document.createElement("li");
    const myInput = document.createElement("input");
    const myLabel = document.createElement("label");

    //adding styles
    myLi.className = "list-group-item";
    myInput.className = "form-check-input me-1";
    myLabel.className = "form-check-label";

    //adding attributes
    //input
    myInput.setAttribute("type", "checkbox");
    myInput.setAttribute("id", value.id);

    //label
    myLabel.setAttribute("for", value.id);
    myLabel.textContent = value.task;

    //append childs

    myLi.append(myInput, myLabel);
    taskList.append(myLi);
  });
};
drawTaskList();
