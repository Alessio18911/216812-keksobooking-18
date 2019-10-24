'use strict';

(function () {
  var MAIN_PIN_HALF_WIDTH = window.util.MAIN_PIN_WIDTH / 2;
  var MAP_MAX_WIDTH = 1200;
  var MAP_MAX_HEIGHT = 630;
  var MAIN_PIN_X_MIN = -MAIN_PIN_HALF_WIDTH;
  var MAIN_PIN_X_MAX = MAP_MAX_WIDTH - MAIN_PIN_HALF_WIDTH;
  var MAIN_PIN_Y_MIN = 47;
  var MAIN_PIN_Y_MAX = MAP_MAX_HEIGHT - window.util.MAIN_PIN_HEIGHT;
  var ENTER_KEY_CODE = 13;
  var GET_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var GET_METHOD = 'GET';

  window.util.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      window.backend.httpRequest(GET_DATA_URL, GET_METHOD, window.util.loadPage);
    }
  });

  window.util.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var isPageActive = !window.util.isPageActive;
    window.backend.httpRequest(GET_DATA_URL, GET_METHOD, window.util.loadPage);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinHorizontalPosition = window.util.mainPin.offsetLeft - shift.x;
      var mainPinVerticalPosition = window.util.mainPin.offsetTop - shift.y;

      if (mainPinHorizontalPosition <= MAIN_PIN_X_MAX && mainPinHorizontalPosition > MAIN_PIN_X_MIN) {
        window.util.mainPin.style.left = mainPinHorizontalPosition + 'px';
      }

      if (mainPinVerticalPosition <= MAIN_PIN_Y_MAX && mainPinVerticalPosition > MAIN_PIN_Y_MIN) {
        window.util.mainPin.style.top = mainPinVerticalPosition + 'px';
      }

      window.util.getCoordsOfMainPin(isPageActive);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      window.util.getCoordsOfMainPin(isPageActive);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
