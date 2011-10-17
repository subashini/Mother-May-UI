(function() {

  var root   = this
    , mother = null;

  // Exports as CommonJS module
  if (typeof exports !== 'undefined') {
    mother = exports;
  }
  // Exports for UI Automator or Browser
  else {
    mother = root.mother = {};
  }

  // Configuration options
  // Can override in test file
  mother.config = {
    verbose: false
  };

  // Each test case is referenced by name on the tests hash
  mother.tests = {};

  // Series of tests to run
  mother.scenarios = [];

  // may is really just syntactic sugar
  mother.may = {};

  // Creates a new series of tests to run
  mother.may.I = function(scenarioName) {

    // Begins a new series of tests
    var scenario = {
      name  : scenarioName
    , tests : []
    };
    mother.scenarios.push(scenario);

    return this;
  };

  // Adds a test to the current series
  mother.may.and = function(testName, testFunction) {

    // Override the existing test function if provided
    if (testFunction !== undefined) {
      mother.tests[testName] = testFunction;
    }
    else {
      testFunction = mother.tests[testName];
    }

    // Attach the test case to the current scenario
    var currentScenario = mother.scenarios[mother.scenarios.length - 1];
    if (currentScenario) {
      var test = {
        name         : testName
      , testFunction : testFunction
      };
      currentScenario.tests.push(test);
    }
    // No scenario to associate test case too
    else {
      var exception = {
        message: 'No scenario to attach test case to.'
          + ' May need to call `mother.may.I()` first'
      }
      throw exception;
    }

    return this;
  };

  // Run the current scenario
  mother.may.please = function(name, test) {
    var currentScenario = mother.scenarios[mother.scenarios.length - 1];
    if (currentScenario) {
      mother.runScenario(currentScenario);
    }
    // No scenario to run
    else {
      var exception = {
        message: 'No scenario to run. May need to call `mother.may.I()` first'
      }
      throw exception;
    }

    return this;
  };

  // Runs all scenarios
  mother.please = function() {
    for (var i = 0; i < mother.scenarios.length; i++) {
      var scenario = mother.scenarios[i];
      mother.runScenario(scenario);
    }

    return this;
  };

  // Called before each scenario is run. Takes care of basic boiler plate code.
  // Can override in the test file with:
  // mother.setUp = function() { /* custom code */ }
  mother.setUp = function() {

  };

  // Called after each scenario is run. Handles basic clean up.
  // Can override in the test file with:
  // mother.tearDown = function() { /* custom code */ }
  mother.tearDown = function() {

  };

  // Run all the tests in a scenario
  mother.runScenario = function(scenario) {
    mother.setUp.call(this);

    scenario.passedTests = [];
    try {
      for (var i = 0; i < scenario.tests.length; i++) {
        var test = scenario.tests[i];
        test.testFunction.call(this);
        scenario.passedTests[i] = test;
      }
    }
    catch (exception) {
    }

    mother.tearDown.call(this);
  }

}).call(this);

