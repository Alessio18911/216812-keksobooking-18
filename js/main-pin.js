'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;
  var mainPin = document.querySelector('.map__pin--main');

  window.form.fillAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, window.availability.isPageActive);

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      var isPageActive = !window.availability.isPageActive;
      window.form.fillAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);
      window.availability.activatePage(isPageActive, window.availability.dialogFields, window.map.map, window.form.adForm);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      var isPageActive = !window.availability.isPageActive;
      window.form.fillAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);
      window.availability.activatePage(isPageActive, window.availability.dialogFields, window.map.map, window.form.adForm);
    }
  });
})();
