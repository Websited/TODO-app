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
