const TodoItem = class {
  constructor(id, completed = false, title, deadline) {
    this.id = id;
    this.completed = completed;
    this.title = title;
    this.deadline = deadline === "" ? "" : new Date(Date.UTC(deadline.toString().substring(0, 4), deadline.toString().substring(4, 6) - 1, deadline.toString().substring(6)));
  }

  edit(title) {
    this.title = title;
  }

  toggleCheckbox() {
    if (this.completed === true) {
      this.completed = false;
    } else {
      this.completed = true;
    }
  }
};
