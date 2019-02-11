const HTMLTodoIRenderer = {
  render: function(todos) {
    const today = new Date();
    const listItem = document.getElementById("list");
    const todoList = [];
    if (todos.length > 0) {
      todos.forEach(function (todoObj) {
        function generateTodoMarkup(todoObj) {
          return `<div class="todo-item ${todoObj.completed ? "finished" : ""} ${todoObj.deadline === "" ? "" : (todoObj.deadline < today ? "past-due" : "")}">
                    <div class="checkbox">
                      <input onclick=TodoApp.toggleCompleted(${todoObj.id}) type="checkbox" id="checkbox-${todoObj.id}" name="" value="Gotowe" class="switch-input"  ${todoObj.completed ? "checked" : ""}>
                      <label for="checkbox-${todoObj.id}" class="switch-label"></label>
                    </div>
                    <p class="todo-title subtitle-1" id="${todoObj.id}-name" ondblclick="TodoApp.appendForm(this,'${todoObj.title}', ${todoObj.id})">
                        ${todoObj.title}
                    </p>
                    <p class="todo-date subtitle-2">
                        ${todoObj.deadline ?  todoObj.deadline.toISOString().substring(0,10) : "No deadline"}
                    </p>
                    <button onclick="TodoApp.deleteTodo(${todoObj.id})" type="submit" class="button button-remove" name="remove todo"><i class="material-icons">delete</i></button>
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
