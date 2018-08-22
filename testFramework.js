const _suites = [];

function testSuite(suiteName, fn) {
  _suites.push(function runSuite() {
    console.log(`Suite ${suiteName}`);

    const tests = [];

    function unitTest(testName, fn) {
      tests.push(function runTest() {
        console.log(`Test ${suiteName} ${testName}`);
        try {
          fn((condition, ...args) => console.assert(condition, testName, ...args));
        } catch (error) {
          console.error(error.message);
          console.error(error.stack);
        }
      });
    }

    try {
      fn(unitTest);
      tests.forEach(runTest => runTest());
    } catch (error) {
      console.error(error.message);
      console.error(error.stack);
    }
    console.log(`----------`);
  })
}

function runSuites() {
  _suites.forEach(runSuite => runSuite());
}
