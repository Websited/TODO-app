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
  count() {
    return this.length;
  }
  remove(id) {
    /**
     * this could be improved
     */
    const toRemove = this.indexOf(this.filter(item => item.id === id)[0]);
    this.splice(toRemove, 1);
  }
}

/**
 * normally you would have tests in separate files
 * but since we are doing browser without any transpilation let's have below actual code
 * the purpose of each unit test is to check one feature in as much isolation as possible
 */
testSuite("TodoItemCollection", function(unitTest) {

  const item1 = { id: 1 };
  const item2 = { id: 2 };
  const item3 = { id: 3 };
  const item4 = { id: 4 };

  unitTest("should have count() method", function (assert) {
    const items = new TodoItemCollection(item1, item2, item3);
    assert(items.count() === 3);
  });

  unitTest("adding should be possible", function (assert) {
    const items = new TodoItemCollection(item1, item2, item3);
    items.add(item4);
    assert(items.count() === 4);
  });

  unitTest("adding existing items twice should not be possible", function (assert) {
    const items = new TodoItemCollection(item1, item2, item3);
    items.add(item3);
    assert(items.count() === 3);
  });

  unitTest("removing should be possible", function (assert) {
    const items = new TodoItemCollection(item1, item2, item3);
    items.remove(item2.id);
    assert(items.count() === 2);
  });

  unitTest("removing not existing items should not be possible", function (assert) {
    const items = new TodoItemCollection(item1, item2, item3);
    items.remove(item4.id);
    assert(items.count() === 3);
  });

});
