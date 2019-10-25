'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  function debounce(cb) {
    var lastTimeout;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    };
  }

  window.common = {
    debounce: debounce
  };
})();
