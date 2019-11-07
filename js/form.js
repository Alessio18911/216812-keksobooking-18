'use strict';

(function () {
  var POST_DATA_URL = 'https://js.dump.academy/keksobooking';

  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');
  var locationTypeField = adForm.querySelector('#type');
  var locationPriceField = adForm.querySelector('#price');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomsSelect = adForm.querySelector('#room_number');
  var guestsSelect = adForm.querySelector('#capacity');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  var roomsToCapacity = {
    '1': {
      capacity: ['1'],
      errorText: 'В 1 комнате может быть не более 1 гостя'
    },

    '2': {
      capacity: ['1', '2'],
      errorText: 'В 2 комнатах может быть не более 2 гостей'
    },

    '3': {
      capacity: ['1', '2', '3'],
      errorText: 'В 3 комнатах может быть не более 3 гостей'
    },

    '100': {
      capacity: ['0'],
      errorText: '100 комнат не для гостей'
    }
  };

  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  function setMinPrice(locationType) {
    locationPriceField.setAttribute('min', MinPrice[locationType]);
    locationPriceField.placeholder = MinPrice[locationType];
  }

  function onRoomsGuestsChange() {
    var numberOfRooms = roomsSelect.value;
    var numberOfGuests = guestsSelect.value;

    if (!roomsToCapacity[numberOfRooms].capacity.includes(numberOfGuests)) {
      guestsSelect.setCustomValidity(roomsToCapacity[numberOfRooms].errorText);
    } else {
      guestsSelect.setCustomValidity('');
    }
  }

  function onLocationTypeFieldChange(evt) {
    setMinPrice(evt.target.value.toUpperCase());
  }

  function onTimeSelectsChange(evt) {
    var target = evt.target;

    switch (target.id) {
      case 'timein':
        timeOutSelect.value = target.value;
        break;

      default:
        timeInSelect.value = target.value;
    }
  }

  function disablePage() {
    window.map.pinsData = [];
    adForm.reset();
    window.mapForm.mapFilters.reset();
    window.map.clearMap();
    window.mainPin.setDefaultCoordsOfMainPin();
    document.querySelectorAll('.ad-form__photo').forEach(function (photo) {
      photo.remove();
    });
    window.upload.clearPreviews(window.upload.avatarFileChooser);
    window.upload.clearPreviews(window.upload.fileChooser, '.ad-form__photo', window.upload.dummy);
    setMinPrice(locationTypeField.value.toUpperCase());
    window.mainPin.togglePageAvailability();
  }

  function onXhrPostSuccess() {
    window.utils.showSuccess();
    disablePage();
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.httpRequest(POST_DATA_URL, 'POST', onXhrPostSuccess, new FormData(window.form.adForm));
  }

  function onResetBtnClick() {
    disablePage();
  }

  locationTypeField.addEventListener('change', onLocationTypeFieldChange);
  guestsSelect.addEventListener('change', onRoomsGuestsChange);
  roomsSelect.addEventListener('change', onRoomsGuestsChange);
  timeInSelect.addEventListener('change', onTimeSelectsChange);
  timeOutSelect.addEventListener('change', onTimeSelectsChange);
  adForm.addEventListener('submit', onFormSubmit);
  adFormReset.addEventListener('click', onResetBtnClick);

  window.form = {
    adForm: adForm,
    addressField: addressField
  };
})();
