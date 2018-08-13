const TodoItem = class {
  constructor(id, done = false, name, deadline) {
    this.id = id,
      this.done = done;
    this.name = name;
    this.deadline = deadline;
  }
  convertDeadline() {
    const year = this.deadline.toString().substring(0, 4);
    const month = this.deadline.toString().substring(4, 6) - 1;
    const day = this.deadline.toString().substring(6, 8);
    return new Date(year, month, day);
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

class TodoItemCollection extends Array {
  constructor(...todos) {
    super(...todos);
  }
  add(todo) {
    this.push(todo);
  }
  remove(id) {
    const toRemove = this.indexOf(this.filter(item => item.id === id)[0]);
    this.splice(toRemove, 1);
  }
}

const HTMLTodoIRenderer = {
  render: function(todos) {
    const today = new Date();
    const listItem = document.getElementById("list");
    const todoList = [];
    todos.forEach(function(todoObj){
      function generateTodoMarkup(todoObj) {
        return `<div class="panel panel-default todo-item ${todoObj.done ? "finished" : ""} ${todoObj.deadline === "" ? "" : (todoObj.convertDeadline() < today ? "past-due" : "")}" >
                          <div class="panel-body">
                              <div class="row">
                                  <div class="col-sm-2">
                                      <div class="checkbox">
                                          <label>
                                              <input onclick=TodoApp.toggleDone(${todoObj.id}) type="checkbox" ${todoObj.done ? "checked" : ""}>
                                          </label>
                                      </div>
                                  </div>
                                  <div class="col-sm-6">
                                      <h4 class="todo-name" id="${todoObj.id}-name" ondblclick="TodoApp.appendForm(this,'${todoObj.name}', ${todoObj.id})">
                                          ${todoObj.name}
                                      </h4>
                                  </div>
                                  <div class="col-sm-2">
                                      <h4 class="todo-date">
                                          ${todoObj.deadline ?  todoObj.convertDeadline().toISOString().slice(0, 10) : "No deadline"}
                                      </h4>
                                  </div>
                                  <div class="col-sm-2">
                                      <button onclick="TodoApp.deleteTodo(${todoObj.id})" type="submit" class="btn btn-block btn-danger" name="remove todo">Remove</button>
                                  </div>
                              </div>
                          </div>
                      </div>`
        };
      const todo = generateTodoMarkup(todoObj);
      todoList.push(todo);
      const listItem = document.getElementById("list");
      listItem.innerHTML = todoList.join("");
    });
  }
}

const TodoApp = {
   handleData: function() {
    const name = document.getElementById("todo-name");
    const date = document.getElementById("todo-date");
    const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
    todos.add(new TodoItem(id, false, name.value, date.value.split("-").join("")));
    name.value = ""
    date.value = ""
    this.localStorageWrite();
  },
  toggleDone: function(id) {
    todos.filter(item => item.id === id)[0].toggleCheckbox();
    this.localStorageWrite();
  },
   deleteTodo: function(id) {
    todos.remove(id);
    this.localStorageWrite();
  },
  appendForm: function(todoNameElement,name, todoId) {
    todoNameElement.innerHTML = `<form onsubmit="event.preventDefault(); TodoApp.editName(${todoId});"><span class="input-group-text">Press Enter to save</span><input id='new-name' type="text" value=${name} required/></form>`
  },
  editName: function(todoId) {
    const todo = todos.filter(todo => todo.id === todoId)[0];
    todo.edit(document.getElementById('new-name').value);
    localStorage.setItem('todos', JSON.stringify(todos));
    HTMLTodoIRenderer.render(todos);
  },
  localStorageRead: function() {
    var retrievedTodos = JSON.parse(localStorage.getItem('todos'));
    if (retrievedTodos) {
      retrievedTodos.forEach(function(todo) {
        todos.add(new TodoItem(todo.id, todo.done, todo.name, todo.deadline))
        HTMLTodoIRenderer.render(todos);
      });
    } else {
      HTMLTodoIRenderer.render(todos);
    }
  },
  localStorageWrite: function() {
    localStorage.setItem('todos', JSON.stringify(todos));
    HTMLTodoIRenderer.render(todos);
  }
};

const todos = new TodoItemCollection();
TodoApp.localStorageRead();
