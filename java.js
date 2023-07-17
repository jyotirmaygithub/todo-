let text = document.getElementById("todo");
let button = document.getElementById("changingbutton");
let todobox = document.getElementById("todocontainer");
let username = document.getElementById("username");

username.value = JSON.parse(localStorage.getItem("username"));

displaytodo();

button.addEventListener("click", function () {
  let todo = {
    textvalue: text.value,
    textcut: "",
  };
  addingtolocalstorage(todo);
  text.value = "";
});

username.addEventListener("change", function (e) {
  let usernametext = e.target.value;
  localStorage.setItem("username", JSON.stringify(usernametext));
});

function addingtolocalstorage(text) {
  let todoarray = availabletodo();
  console.log(text);
  todoarray.push(text);
  localStorage.setItem("todo", JSON.stringify(todoarray));
  displaytodo();
}

function availabletodo() {
  let array;
  if (localStorage.getItem("todo") == null) {
    array = [];
  } else {
    array = JSON.parse(localStorage.getItem("todo"));
  }
  return array;
}

function displaytodo() {
  let todo = availabletodo();
 
  let todolist = [];
  todo.forEach((todotext, index) => {
    todolist += `   <div class="todonotedown"  id="todobox" >
    <input type="radio" name="radio-tick" onclick= "todoclick(this.id)" id="${index}" value="unknown" class = "tick-one " />
      <input
        type="text"
        id="${index}"
        value="${todotext.textvalue}"
        class="textappear editor ${todotext.textcut}"
        readonly
      />
    <div class="classoficon">
      <span id="${index}" onclick = "todoedit(this.id)" class="material-symbols-outlined icon-color">
        edit_square
      </span>
      <span
        id="${index}"
        onclick="todoremoval(this.id)"
        class="material-symbols-outlined icon-color"
      >
        delete
      </span>
    </div>
  </div>`;
  });
  todobox.innerHTML = todolist;
}

function todoremoval(indexvalue) {
 
  let todo = availabletodo();
  todo.splice(indexvalue, 1);
  localStorage.setItem("todo", JSON.stringify(todo));
  displaytodo();
}

//blur is the new event which learn here 
function todoedit(index) {
  let editor = document.querySelectorAll(".editor")[index];
  console.log(editor);
  editor.removeAttribute("readonly");
  editor.focus();
  editor.addEventListener("blur", function (event) {
    editor.setAttribute("readonly", "readonly");
    let edit_text = event.target.value;
    let calllocalstorage = availabletodo();
    calllocalstorage[index].textvalue = edit_text;
    localStorage.setItem("todo", JSON.stringify(calllocalstorage));
    displaytodo();
  });
}

function todoclick(index) {
  let todolist = availabletodo();

  if (todolist[index].textcut === "") {
    todolist[index].textcut = "text-cut";
  } else {
    todolist[index].textcut = "";
  }
  localStorage.setItem("todo", JSON.stringify(todolist));
  displaytodo();
}
