(function() {
  var root   = this
    , mother = root.mother

  if (mother === undefined) {
    mother = root.mother = {}
  }

  // Called before each scenario is run. Takes care of basic boiler plate code.
  // Can override in the test file with:
  // mother.setUp = function() { /* custom code */ }
  mother.setUp = function() {
    this.target     = UIATarget.localTarget()
    this.app        = this.target.frontMostApp()
    this.mainWindow = this.app.mainWindow()
  }

}).call(this);

