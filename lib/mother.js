(function() {

  var root   = this
    , mother = null

  // Exports as CommonJS module
  if (typeof exports !== 'undefined') {
    mother = exports
  }
  // Exports for UI Automator or Browser
  else {
    mother = root.mother = {}
  }

  // Each test case is referenced by name on the tests hash
  mother.tests = {}

  // Series of tests to run
  mother.scenarios = []

  // may is really just syntactic sugar
  mother.may = {}

  // Creates a new series of tests to run
  mother.may.I = function(scenarioName) {

    // Begins a new series of tests
    var scenario = {
      name:  scenarioName
    , tests: []
    }
    mother.scenarios.push(scenario)

    return this
  }

  // Adds a test to the current series
  mother.may.and = function(testName, test) {

    // `test` is an optional parameter. If provided, use this test definition.
    if (test !== undefined) {
      mother.tests[testName] = test
    }
    else {
      test = mother.tests[testName]
    }

    var currentScenario = mother.scenarios[mother.scenarios.length - 1]
    if (currentScenario) {
      currentScenario.tests.push(test)
    }
    else {
      // Error with message about no test to run and needing mother.may.I()
      // first.
    }

    return this
  }

  mother.may.please = function(name, test) {
    var currentScenario = mother.scenarios[mother.scenarios.length - 1]
    if (currentScenario) {
      runScenario(currentScenario)
    }
    else {
      // Error with message about no test to run and needing mother.may.I()
      // first.
    }

    return this
  }

  // Runs each set of tests
  mother.please = function() {
    for (var i = 0; i < scenarios.length; i++) {
      var scenario = scenarios[i]
      runScenario(scenario)
    }

    return this
  }

  mother.setUp = function() {
    this.target     = UIATarget.localTarget()
    this.app        = this.target.frontMostApp()
    this.mainWindow = this.app.mainWindow()
  }

  mother.tearDown = function() {

  }

  // Run all the tests in a scenario
  function runScenario(scenario) {
    mother.setUp.call(this)

    for (var i = 0; i < scenario.tests.length; i++) {
      var test = scenario.tests[i]
      test.call(this)
    }

    mother.tearDown.call(this)
  }


}).call(this)

