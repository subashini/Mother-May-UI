(function() {
  var root = this
    , util = root.util;

  if (util === undefined) {
    util = root.util = {};
  }

  // Waits for the element to become visible. If timeout expires, throws an
  // exception.
  util.waitFor = function(element, timeout) {
    if (timeout === undefined) {
      timeout = 5.0;
    }

    var delay = 0.1;

    for (var i = 0; i < timeout / delay; i++) {
      UIATarget.localTarget().delay(delay);

      if (element.isVisible()) {
        return;
      }
    }

    var exception = {};
    exception.message = "Element never became visible";
    throw exception;
  }
}).call(this);

