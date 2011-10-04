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

  // Mother
  // ------

  // Configuration options
  // Can override in test file
  mother.config = {};
  mother.config.verbose = false;
  mother.config.takeScreenshotOptions = {
    NEVER  : 'NEVER'
  , ERROR  : 'ERROR'
  , ALWAYS : 'ALWAYS'
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
      runScenario(currentScenario);
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
      runScenario(scenario);
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
  function runScenario(scenario) {
    UIALogger.logStart(scenario.name);
    mother.setUp.call(this);
    scenario.passedTests = [];

    var test = null;
    try {
      for (var i = 0; i < scenario.tests.length; i++) {
        test = scenario.tests[i];

        if (mother.config.verbose) {
          UIALogger.logMessage(test.name);
        }

        test.testFunction.call(this);

        if (mother.config.takeScreenshot == mother.config.takeScreenshotOptions.ALWAYS) {
          var screenshotName = scenario.name + ' (' + test.name + ')';
          UIATarget.localTarget().captureScreenWithName(screenshotName);
        }

        scenario.passedTests[i] = test;
      }
      UIALogger.logPass(scenario.name);
    }
    catch (exception) {
      var failMessage = 'Error in test \'' + test.name + '\''
        + ' of scenario \'' + scenario.name + '\'.'
        + ' ' + exception.message;
      UIALogger.logFail(failMessage);

      if (mother.config.takeScreenshot == mother.config.takeScreenshotOptions.ALWAYS ||
          mother.config.takeScreenshot == mother.config.takeScreenshotOptions.ERROR) {
        var screenshotName = scenario.name + ' (' + test.name + ')';
        UIATarget.localTarget().captureScreenWithName(screenshotName);
      }

      if (mother.config.verbose) {
        UAITarget.localTarget().logElementTree();
      }
    }

    mother.tearDown.call(this);
  }


}).call(this);

