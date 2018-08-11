let today = new Date();

const todoItem = class {
  constructor(id,done = false, name, deadline = "") {
    this.id = id,
    this.done = done;
    this.name = name;
    this.deadline = deadline;
  }
  convertDeadline() {
    return new Date(this.deadline.toString().substring(0,4),this.deadline.toString().substring(4,6)-1,this.deadline.toString().substring(6))
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
  constructor(name,...todos) {
    super(...todos);
    this.name = name;
  }
  add(todo) {
    this[0].push(todo);
  }
  remove(id) {
    this[0] = this[0].filter(item => item.id != id);
  }
}

const todos = new todoItemCollection('My todos', [
  new todoItem(0,false, "learn react", 20181231),
  new todoItem(1,false, "buy milk", 20180808),
  new todoItem(2,true, "fix bike", ""),
  new todoItem(3,true, "learn react", 20181019),
]);

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
                    <div class="col-sm-4">
                        <h4 class="todo-name">
                            ${todo.name}
                        </h4>
                    </div>
                    <div class="col-sm-2">
                        <h4 class="todo-date">
                            ${todo.deadline ?  todo.convertDeadline().toISOString().slice(0, 10) : "No deadline"}
                        </h4>
                    </div>
                    <div class="col-sm-2">
                        <button type="submit" class="btn btn-block btn-primary" name="remove todo">Edit</button>
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
  for (i = 0; i < todos[0].length; i++) {
    const todo = generateTodoMarkup(todos[0][i]);
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
  todos[0].filter(item => item.id === id)[0].toggleCheckbox();
  createTodoList(todos);
}

createTodoList(todos);

function handleData() {
  const name = document.getElementById("todo-name").value
  const date = document.getElementById("todo-date").value.split("-").join("")
  const id = todos[0].length;
  todos.add(new todoItem(id, false, name, date));
  console.log(todos);
  createTodoList(todos);
}
