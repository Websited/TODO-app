/**
 * extending an Array might not be the best idea
 * it's not supported by older browsers and can't be polyfilled properly
 * but what's more important it doesn't provide any additional features in this case
 */
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