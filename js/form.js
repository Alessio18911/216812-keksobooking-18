'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var locationTypeField = document.querySelector('#type');
  var locationPriceField = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomsSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');

  var rooms = {
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

  var minPriceList = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  function validateRoomsCapacity() {
    var numberOfRooms = roomsSelect.value;
    var numberOfGguests = guestsSelect.value;

    if (!rooms[numberOfRooms].capacity.includes(numberOfGguests)) {
      guestsSelect.setCustomValidity(rooms[numberOfRooms].errorText);
    } else {
      guestsSelect.setCustomValidity('');
    }
  }

  function onLocationTypeFieldChange(evt) {
    var locationType = evt.target.value;
    locationPriceField.setAttribute('min', minPriceList[locationType]);
    locationPriceField.placeholder = minPriceList[locationType];
  }

  function onTimeSelectsChange(evt) {
    if (evt.target.id === 'timein') {
      timeOutSelect.value = evt.target.value;
      return;
    }

    timeInSelect.value = evt.target.value;
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.util.disablePage);
  }

  locationTypeField.addEventListener('change', onLocationTypeFieldChange);
  guestsSelect.addEventListener('change', validateRoomsCapacity);
  roomsSelect.addEventListener('change', validateRoomsCapacity);
  timeInSelect.addEventListener('change', onTimeSelectsChange);
  timeOutSelect.addEventListener('change', onTimeSelectsChange);
  adForm.addEventListener('submit', onFormSubmit);

  window.form = {
    adForm: adForm,
    validateRoomsCapacity: validateRoomsCapacity
  };
})();
