const TodoApp = {
   handleData: function() {
    const title = document.getElementById("todo-title");
    const date = document.getElementById("todo-date");
    const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
    todos.add(new TodoItem(id, false, title.value, date.value.split("-").join("")));
    title.value = ""
    date.value = ""
    this.dataWrite('todos', todos);
  },
  toggleCompleted: function(id) {
    todos.filter(item => item.id === id)[0].toggleCheckbox();
    this.dataWrite('todos', todos);
  },
   deleteTodo: function(id) {
    todos.remove(id);
    this.dataWrite('todos', todos);
  },
  deleteCompleted: function() {
    completedTodos = todos.filter(todo => todo.completed === true);
    completedTodos.forEach(todo => TodoApp.deleteTodo(todo.id));
    console.log(todos);
  },
  appendForm: function(todoTitleElement,title, todoId) {
    todoTitleElement.innerHTML = `<form class="title-edit" onsubmit="event.preventDefault(); TodoApp.editTitle(${todoId});"><input maxlength="20" id='new-title' type="text" value=${title} required/></form>`
  },
  editTitle: function(todoId) {
    const todo = todos.filter(todo => todo.id === todoId)[0];
    todo.edit(document.getElementById('new-title').value);
    localStorage.setItem('todos', JSON.stringify(todos));
    HTMLTodoIRenderer.render(todos);
  },
  dataRead: async function(todoCollectionTitle, api = 'localStorage') { // api = localStorage or remoteApi
    const retrievedTodos = await apis[api].read(todoCollectionTitle);
    if (retrievedTodos) {
      retrievedTodos.forEach(function(todo) {
        todos.add(new TodoItem(todo.id, todo.completed, todo.title, todo.deadline ? todo.deadline.substring(0,10).split("-").join("") : todo.deadline = ""))
        HTMLTodoIRenderer.render(todos);
      });
    } else {
      HTMLTodoIRenderer.render(todos);
    }
  },
  dataWrite: function(todoCollectionTitle, todoData, api = 'localStorage') { // api = localStorage or remoteApi
    apis[api].write(todoCollectionTitle, todoData);
    HTMLTodoIRenderer.render(todoData);
  }
};
