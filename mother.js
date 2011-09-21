(function() {

  var root   = this
    , mother = root.mother = {}

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
      for (var i = 0; i < currentScenario.tests.length; i++) {
        var test = currentScenario.tests[i]
        test()
      }
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
      for (var j = 0; j < scenario.tests.length; j++) {
        var test = scenario.tests[j]
        test()
      }
    }

    return this
  }

}).call(this)

