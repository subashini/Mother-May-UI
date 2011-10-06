// You can run this test file two ways:
// 1) Using Instruments
//    a. Profile your app in Xcode to run in Instruments
//    b. Select the Automation instrument
//    c. Click Add then Import under the Scripts pane on the left
//    d. Select this file
//    e. Click the Record button at the top
//    f. The test results will be outputted in the Trace Log
//
// 2) Using the included bash script mother.sh (Xcode 4.2+ only)
//    a. mother/bin/ios/mother.sh -i <device UDID> -a "Car Lot.app" -o runs -v tests.js
//       This command will test the Car Lot app on the specified device,
//       outputting the results and screenshots to the runs directory

// #import is an iOS UI Automation provided macro. Links to the mother-ios.js
// header file.
#import "../../../../mother-ios.js"

// Verbose logging will print out each test case inside a scenario. If false,
// only the final result of each scenario is printed.
mother.config.verbose = true
// Will take a screenshot on every test case (usually corresponding a to a view)
mother.config.takeScreenshot = mother.config.takeScreenshotOptions.ALWAYS

// A setUp function is called at the beginning of each scenario. Mother provides
// a default setUp for iOS apps. You can override it with your custom
// functionality in this file like so:
// mother.setUp = function() {
//   // ...
// }

// A tearDown function is called at the end of each scenario. You can override
// the default tearDown as well:
// mother.tearDown = function() {
//   // ...
// }

// Creates the first scenario. A scenario is a set of test cases to run in
// order.
mother.may.I('Log in and log out as testUser')
  // First test case in the scenario logs a given user in
  // Since this is the first time we're using this test case, we have to declare
  // the function to run
  .and('log in as testUser', function() {
    // Retrieves the first text field in the view
    // Note that this.mainWindow is provided by mother's setUp().
    var usernameField = this.mainWindow.textFields()[0]
    // Sets the text to user 'testUser'
    usernameField.setValue('testUser')
    // Retrieves the first password field in the view
    var passwordField = this.mainWindow.secureTextFields()[0]
    passwordField.setValue('testPassword')
    this.target.logElementTree()
    // Gets the Log In button
    var loginButton = this.mainWindow.buttons()[0]
    loginButton.tap()
    // Do not transition to the next test case until the new view has loaded
    passwordField.waitForInvalid()
  })
  // The next test case in the scenario logs the user out ()
  .and('log out', function() {
    // As this is a super simple app, logging out simply means pressing the back
    // button to the home screen.
    var backButton = this.mainWindow.navigationBar().leftButton()
    // The util module is provided by the Mother May UI framework. It waits
    // until the backButton becomes valid (clickable)
    util.waitFor(backButton)
    // Assert the back button exists. If not, throw an exception and fail this
    // scenario
    assert.isTrue(backButton.isValid(), 'Unable to find Back button')
    // Go back a view
    backButton.tap()
    backButton.waitForInvalid()
  })

// Calling please on mother executes each scenario in order until one fails or
// they all pass.
// If you only want to execute a single scenario, you can call please on a
// specific scenario instead, like so:
// mother.may.I('awesome scenario').and('do something').please()
mother.please()

