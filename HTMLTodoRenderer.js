const HTMLTodoRenderer = {
  render: function(todos) {
    const today = new Date();
    const listItem = document.getElementById("list");
    const todoList = [];
    if (todos.length > 0) {
      todos.forEach(function(todoObj){
        function generateTodoMarkup(todoObj) {
          return `<div class="panel panel-default todo-item ${todoObj.done ? "finished" : ""} ${todoObj.deadline === "" ? "" : (todoObj.deadline < today ? "past-due" : "")}" >
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
                                            ${todoObj.deadline ?  todoObj.deadline.toISOString().substring(0,10) : "No deadline"}
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
        listItem.innerHTML = todoList.join("");
      });
    } else {
      listItem.innerHTML = "";
    }
  }
}
