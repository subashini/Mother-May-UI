(function() {

  var root   = this
    , assert = null

  // Exports as CommonJS module
  if (typeof exports !== 'undefined') {
    assert = exports
  }
  // Exports for UI Automator or Browser
  else {
    assert = root.assert = {}
  }

  // Throws exception if (actual != expected). If custom message string is not
  // provided, uses generic message string.
  assert.isEqual = function(actual, expected, message) {
    if (actual != expected) {
      var exception = {}
      if (message) {
        exception.message = message
      }
      else {
        exception.message = 'Expected \'' + expected + '\' got \'' + actual + '\'.'
      }
      throw exception
    }
  }

  // Throws exception if (actual !== expected). If custom message string is not
  // provided, uses generic message string.
  assert.isStrictEqual = function(actual, expected, message) {
    if (actual !== expected) {
      var exception = {}
      if (message) {
        exception.message = message
      }
      else {
        exception.message = 'Expected \'' + expected + '\' got \'' + actual + '\'.'
      }
      throw exception
    }
  }

  // Throws exception if !value. If custom message string is not
  // provided, uses generic message string.
  assert.isTrue = function(value, message) {
    if (!value) {
      var exception = {}
      if (message) {
        exception.message = message
      }
      else {
        exception.message = 'Expression \'' + value + '\' failed.'
      }
      throw exception
    }
  }

}).call(this);

