const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemsList = document.querySelector(".todo-items");

let todos = [];

//prevent page reload when adding items, then add
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

// add items to list
function addTodo(item) {
  if (item !== "") {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };

    todos.push(todo);
    addToLocalStorage(todos);

    todoInput.value = "";
  }
}

// render todo list to screen
function renderTodos(todos) {
  todoItemsList.innerHTML = "";

  todos.forEach(function (item) {
    const checked = item.completed ? "checked" : null;

    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id);
    if (item.completed === true) {
      li.classList.add("checked");
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">x</button>
    `;
    todoItemsList.append(li);
  });
}

//convert array to JSON and add to local storage
function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos);
}

//convert from JSON to array
function getFromLocalStorage() {
  const reference = localStorage.getItem("todos");
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

//toggle strikethrough
function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

//delete todo and display new list
function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });

  addToLocalStorage(todos);
}

getFromLocalStorage();

//listen for click event to mark as completed or delete
todoItemsList.addEventListener("click", function (event) {
  if (event.target.type === "checkbox") {
    toggle(event.target.parentElement.getAttribute("data-key"));
  }

  if (event.target.classList.contains("delete-button")) {
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }
});
