'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 82;
  var MAIN_PIN_HALF_WIDTH = MAIN_PIN_WIDTH / 2;
  var MAP_MAX_WIDTH = 1201;
  var MAP_MAX_HEIGHT = 631;
  var MAIN_PIN_X_MIN = -MAIN_PIN_HALF_WIDTH;
  var MAIN_PIN_X_MAX = MAP_MAX_WIDTH - MAIN_PIN_HALF_WIDTH;
  var MAIN_PIN_Y_MIN = 47;
  var MAIN_PIN_Y_MAX = MAP_MAX_HEIGHT - MAIN_PIN_HEIGHT;
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinImg = mainPin.querySelector('img');

  window.form.fillInAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, window.availability.isPageActive);

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      var isPageActive = !window.availability.isPageActive;
      window.form.fillInAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);
      window.availability.activatePage(isPageActive, window.availability.dialogFields, window.map.map, window.form.adForm);
      window.backend.load(window.map.renderPins);
    }
  });

  mainPinImg.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var isPageActive = !window.availability.isPageActive;
    window.form.fillInAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);
    window.availability.activatePage(isPageActive, window.availability.dialogFields, window.map.map, window.form.adForm);
    window.backend.load(window.map.renderPins);

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

      var mainPinHorizontalPosition = mainPin.offsetLeft - shift.x;
      var mainPinVerticalPosition = mainPin.offsetTop - shift.y;

      if (mainPinHorizontalPosition < MAIN_PIN_X_MAX && mainPinHorizontalPosition > MAIN_PIN_X_MIN) {
        mainPin.style.left = mainPinHorizontalPosition + 'px';
      }

      if (mainPinVerticalPosition < MAIN_PIN_Y_MAX && mainPinVerticalPosition > MAIN_PIN_Y_MIN) {
        mainPin.style.top = mainPinVerticalPosition + 'px';
      }

      window.form.fillInAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      window.form.fillInAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
