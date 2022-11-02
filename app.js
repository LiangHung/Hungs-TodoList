let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  e.preventDefault();

  let form = e.target.parentElement;
  let todotext = form.children[0].value;
  let todoMon = form.children[1].value;
  let todoDay = form.children[2].value;
  console.log(todotext, todoMon, todoDay);
  //   console.log(todoMon);

  if (todotext === "") {
    alert("請勿空白");
    return;
  }

  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todotext;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMon + " / " + todoDay;
  todo.appendChild(text);
  todo.appendChild(time);

  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

  completeButton.addEventListener("click", (e) => {
    // console.log(e.target);
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

  trashButton.addEventListener("click", (e) => {
    // console.log(e.target);
    let todoItem = e.target.parentElement;
    todoItem.addEventListener("animationend", () => {
      let text = todoItem.children[0].innerText;
      let myListArr = JSON.parse(localStorage.getItem("list"));
      myListArr.forEach((item, index) => {
        if (item.todotext == text) {
          myListArr.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArr));
        }
      });
      todoItem.remove();
    });
    todoItem.style.animation = "scaleDown 0.5s forwards";
  });

  todo.append(completeButton);
  todo.append(trashButton);

  todo.style.animation = "scaleUp 0.5s forwards";

  let myTodo = {
    todotext: todotext,
    todoMon: todoMon,
    todoDay: todoDay,
  };

  // 儲存資料
  let myList = localStorage.getItem("list");
  if (myList === null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArr = JSON.parse(myList);
    myListArr.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArr));
  }

  console.log(JSON.parse(localStorage.getItem("list")));

  form.children[0].value = "";

  section.appendChild(todo);

  // section.appendChild(todo);
});

let myList = localStorage.getItem("list");
// console.log(myList);
if (myList !== null) {
  let myListArr = JSON.parse(myList);
  // console.log(myListArr);
  myListArr.forEach((item) => {
    console.log(typeof item);

    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = item.todotext;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = item.todoMon + " / " + item.todoDay;
    todo.appendChild(text);
    todo.appendChild(time);

    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeButton.addEventListener("click", (e) => {
      // console.log(e.target);
      let todoItem = e.target.parentElement;
      todoItem.classList.toggle("done");
    });

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    trashButton.addEventListener("click", (e) => {
      // console.log(e.target);
      let todoItem = e.target.parentElement;
      todoItem.addEventListener("animationend", () => {
        let text = todoItem.children[0].innerText;
        let myListArr = JSON.parse(localStorage.getItem("list"));
        myListArr.forEach((item, index) => {
          if (item.todotext == text) {
            myListArr.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myListArr));
          }
        });
        todoItem.remove();
      });
      todoItem.style.animation = "scaleDown 0.5s forwards";
    });

    todo.append(completeButton);
    todo.append(trashButton);
    section.appendChild(todo);
  });
}
