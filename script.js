let today = new Date();

const todoItem = class {
  constructor(id,done, name, deadline) {
    this.id = id,
    this.done = done;
    this.name = name;
    this.deadline = deadline;
  }
  convertDeadline() {
    return new Date(this.deadline.toString().substring(0,4),this.deadline.toString().substring(4,6)-1,this.deadline.toString().substring(6))
  }
};

class todoItemCollection extends Array {
  constructor(name,...todos) {
    super(...todos);
    this.name = name;
  }
  add(todo) {
    this.push(todo);
  }
  remove(id) {
    this[0] = this[0].filter(item => item.id != id);
  }
}

const todos = new todoItemCollection('My todos', [
  new todoItem(0,false, "learn react", 20181231),
  new todoItem(1,false, "buy milk", 20180808),
  new todoItem(2,true, "fix bike", 20180119),
  new todoItem(3,true, "learn react", 20181019),
]);

function generateTodoMarkup(todo){
  return `<div class="panel panel-default todo-item ${todo.done ? "finished" : ""} ${todo.convertDeadline() > today ? "past-due" : ""}" >
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-2">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="" value="Gotowe" ${todo.done ? "checked" : ""}>
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
                            ${todo.convertDeadline().toISOString().slice(0, 10)}
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

createTodoList(todos);
