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
  deleteCompleted: function() {
    completedTodos = todos.filter(todo => todo.done === true);
    completedTodos.forEach(todo => TodoApp.deleteTodo(todo.id));
    console.log(todos);
  },
  appendForm: function(todoNameElement,name, todoId) {
    todoNameElement.innerHTML = `<form class="name-edit" onsubmit="event.preventDefault(); TodoApp.editName(${todoId});"><input maxlength="20" id='new-name' type="text" value=${name} required/></form>`
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
