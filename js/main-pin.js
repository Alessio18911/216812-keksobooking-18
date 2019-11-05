'use strict';

(function () {
  var MAP_MAX_WIDTH = 1200;
  var MAP_MAX_HEIGHT = 630;
  var MAIN_PIN_WIDTH = 66;
  var MAIN_PIN_HEIGHT = 82;
  var MAIN_PIN_HALF_WIDTH = MAIN_PIN_WIDTH / 2;
  var MAIN_PIN_X_MIN = -MAIN_PIN_HALF_WIDTH;
  var MAIN_PIN_X_MAX = MAP_MAX_WIDTH - MAIN_PIN_HALF_WIDTH;
  var MAIN_PIN_Y_MIN = 47;
  var MAIN_PIN_Y_MAX = MAP_MAX_HEIGHT - MAIN_PIN_HEIGHT;
  var GET_DATA_URL = 'https://js.dump.academy/keksobooking/data';

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinInitialTop = window.getComputedStyle(mainPin).getPropertyValue('top');
  var mainPinInitialLeft = window.getComputedStyle(mainPin).getPropertyValue('left');

  function setAddressCoords(data) {
    var pinX = mainPin.offsetLeft + MAIN_PIN_HALF_WIDTH;
    var pinY = data ? mainPin.offsetTop + MAIN_PIN_HEIGHT : mainPin.offsetTop + MAIN_PIN_HALF_WIDTH;

    window.form.addressField.value = pinX + ', ' + pinY;
  }

  function togglePageAvailability(data, method) {
    window.map.map.classList.toggle('map--faded');
    window.map.clearMap();
    window.form.adForm.classList.toggle('ad-form--disabled');
    window.form.adForm.reset();
    mainPin.style.top = mainPinInitialTop;
    mainPin.style.left = mainPinInitialLeft;
    window.mapForm.mapFilters.reset();
    document.querySelectorAll('.ad-form__photo').forEach(function (photo) {
      photo.remove();
    });
    window.upload.clearPreviews(window.upload.avatarFileChooser);
    window.upload.clearPreviews(window.upload.fileChooser, '.ad-form__photo', window.upload.dummy);
    setAddressCoords();
    window.utils.toggleDialogFieldsAvailability();
    window.form.setMinPrice(window.form.locationTypeField.value.toUpperCase());

    if (data) {
      window.map.pinsData = data;
      window.map.renderPins(data, method);
      setAddressCoords(data);
      window.utils.toggleDialogFieldsAvailability(data);
    }

    if (method === 'POST') {
      setAddressCoords();
      window.utils.toggleDialogFieldsAvailability();
      window.utils.showSuccess();
    }
  }

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEY_CODE) {
      if (!window.map.pinsData.length) {
        window.backend.httpRequest(GET_DATA_URL, 'GET', togglePageAvailability);
      }
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (!window.map.pinsData.length) {
      window.backend.httpRequest(GET_DATA_URL, 'GET', togglePageAvailability);
    }

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

      if (mainPinHorizontalPosition <= MAIN_PIN_X_MAX && mainPinHorizontalPosition >= MAIN_PIN_X_MIN) {
        mainPin.style.left = mainPinHorizontalPosition + 'px';
      }

      if (mainPinVerticalPosition <= MAIN_PIN_Y_MAX && mainPinVerticalPosition > MAIN_PIN_Y_MIN) {
        mainPin.style.top = mainPinVerticalPosition + 'px';
      }

      setAddressCoords(true);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      setAddressCoords(true);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  togglePageAvailability();

  window.mainPin = {
    togglePageAvailability: togglePageAvailability
  };
})();
