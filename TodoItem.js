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
