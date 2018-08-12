const today = new Date();

const todoItem = class {
  constructor(id,done = false, name, deadline) {
    this.id = id,
    this.done = done;
    this.name = name;
    this.deadline = deadline;
  }
  convertDeadline() {
    const year = this.deadline.toString().substring(0,4)
    const month = this.deadline.toString().substring(4,6)-1
    const day = this.deadline.toString().substring(6,8)
    return new Date(year,month,day);
  }

  edit(name) {
    this.name = name;
  }

  toggleCheckbox() {
    if (this.done === true) {
      this.done = false;
    } else {
      this.done = true;
    }
  }
};

class todoItemCollection extends Array {
  constructor(...todos) {
    super(...todos);
  }
  add(todo) {
    this.push(todo);
  }
  remove(id) {
    const toRemove = this.indexOf(this.filter(item => item.id === id)[0]);
    this.splice(toRemove,1);
  }
}

const todos = new todoItemCollection(
);

function generateTodoMarkup(todo){
  return `<div class="panel panel-default todo-item ${todo.done ? "finished" : ""} ${todo.deadline === "" ? "" : (todo.convertDeadline() < today ? "past-due" : "")}" >
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-2">
                        <div class="checkbox">
                            <label>
                                <input onclick=toggleDone(${todo.id}) type="checkbox" ${todo.done ? "checked" : ""}>
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <h4 class="todo-name" id="${todo.id}-name" ondblclick="appendForm(this, ${todo.id})">
                            ${todo.name}
                        </h4>
                    </div>
                    <div class="col-sm-2">
                        <h4 class="todo-date">
                            ${todo.deadline ?  todo.convertDeadline().toISOString().slice(0, 10) : "No deadline"}
                        </h4>
                    </div>
                    <div class="col-sm-2">
                        <button onclick="deleteTodo(${todo.id})" type="submit" class="btn btn-block btn-danger" name="remove todo">Remove</button>
                    </div>
                </div>
            </div>
        </div>`
};

function createTodoList(todos) {
  const todoList = [];
  for (i = 0; i < todos.length; i++) {
    const todo = generateTodoMarkup(todos[i]);
    todoList.push(todo);
  }
  const listItem = document.getElementById("list");
  listItem.innerHTML = todoList.join("");
}

function deleteTodo(id) {
  todos.remove(id);
  createTodoList(todos);
}

function toggleDone(id) {
  todos.filter(item => item.id === id)[0].toggleCheckbox();
  createTodoList(todos);
}

createTodoList(todos);

function handleData() {
  const name = document.getElementById("todo-name");
  const date = document.getElementById("todo-date");
  const id = todos.length > 0 ? todos[todos.length-1].id + 1 : 0;
  todos.add(new todoItem(id, false, name.value, date.value.split("-").join("")));
  createTodoList(todos);
  name.value = ""
  date.value = ""
  localStorage.setItem('todos', JSON.stringify(todos));
}

function appendForm(todoNameElement, todoId) {
  todoNameElement.innerHTML = `<form onsubmit="event.preventDefault(); editName(${todoId});"><input id='new-name' type="text"/></form>`
}

function editName(todoId) {
  const todo = todos.filter(todo => todo.id === todoId)[0];
  todo.edit(document.getElementById('new-name').value);
  createTodoList(todos);
}
var retrievedTodos = localStorage.getItem('todos');
console.log('retrievedTodos: ', JSON.parse(retrievedTodos));
// todos.push(JSON.parse(retrievedTodos));
