'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 82;
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinImg = mainPin.querySelector('img');

  window.form.fillAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, window.availability.isPageActive);

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      var isPageActive = !window.availability.isPageActive;
      window.form.fillAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);
      window.availability.activatePage(isPageActive, window.availability.dialogFields, window.map.map, window.form.adForm);
    }
  });

  mainPinImg.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var isPageActive = !window.availability.isPageActive;
    window.form.fillAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);
    window.availability.activatePage(isPageActive, window.availability.dialogFields, window.map.map, window.form.adForm);

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

      window.form.fillAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);

      mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
      mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      window.form.fillAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
