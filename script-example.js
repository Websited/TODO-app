const TodoItem = class {
  constructor(id, done = false, name, deadline) {
    this.id = id;
    this.done = done;
    this.name = name;
    this.deadline = deadline === "" ? "" : new Date(Date.UTC(deadline.toString().substring(0, 4), deadline.toString().substring(4, 6) - 1, deadline.toString().substring(6)));
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
    if (todos.length > 0) {
      todos.forEach(function(todoObj){
        function generateTodoMarkup(todoObj) {
          return `<div class="todo-item ${todoObj.done ? "finished" : ""} ${todoObj.deadline === "" ? "" : (todoObj.deadline < today ? "past-due" : "")}">
                    <div class="checkbox">
                      <input onclick=TodoApp.toggleDone(${todoObj.id}) type="checkbox" id="checkbox-${todoObj.id}" name="" value="Gotowe" class="switch-input"  ${todoObj.done ? "checked" : ""}>
                      <label for="checkbox-${todoObj.id}" class="switch-label"></label>
                    </div>
                    <p class="todo-name subtitle-1" id="${todoObj.id}-name" ondblclick="TodoApp.appendForm(this,'${todoObj.name}', ${todoObj.id})">
                        ${todoObj.name}
                    </p>
                    <p class="todo-date subtitle-2">
                        ${todoObj.deadline ?  todoObj.deadline.toISOString().substring(0,10) : "No deadline"}
                    </p>
                    <button onclick="deleteTodo(${todoObj.id})" type="submit" class="button button-remove" name="remove todo"><i class="material-icons">delete</i></button>
                  </div>`
          };
        const todo = generateTodoMarkup(todoObj);
        todoList.push(todo);
        listItem.innerHTML = todoList.join("");
      });
    } else {
      listItem.innerHTML = "";
    }
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
        todos.add(new TodoItem(todo.id, todo.done, todo.name,todo.deadline.substring(0,10).split("-").join("")))
        HTMLTodoIRenderer.render(todos);
      });
    } else {
      HTMLTodoIRenderer.render(todos);
    }
  },
  localStorageWrite: function() {
    localStorage.setItem('todos', JSON.stringify(todos));
    HTMLTodoIRenderer.render(todos);
    console.log("writing!");
  }
};

const todos = new TodoItemCollection();
TodoApp.localStorageRead();
