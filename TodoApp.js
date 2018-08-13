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
    HTMLTodoRenderer.render(todos);
  },
  localStorageRead: function() {
    var retrievedTodos = JSON.parse(localStorage.getItem('todos'));
    if (retrievedTodos) {
      retrievedTodos.forEach(function(todo) {
        todos.add(new TodoItem(todo.id, todo.done, todo.name,todo.deadline.substring(0,10).split("-").join("")))
        HTMLTodoRenderer.render(todos);
      });
    } else {
      HTMLTodoRenderer.render(todos);
    }
  },
  localStorageWrite: function() {
    localStorage.setItem('todos', JSON.stringify(todos));
    HTMLTodoRenderer.render(todos);
  }
};
