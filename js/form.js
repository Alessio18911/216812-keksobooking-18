'use strict';

(function () {
  var POST_DATA_URL = 'https://js.dump.academy/keksobooking';
  var POST_METHOD = 'POST';

  var adForm = document.querySelector('.ad-form');
  var addressField = document.querySelector('#address');
  var locationTypeField = document.querySelector('#type');
  var locationPriceField = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomsSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');

  var Rooms = {
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

  var MinPriceList = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  function onRoomsGuestsChange() {
    var numberOfRooms = roomsSelect.value;
    var numberOfGguests = guestsSelect.value;

    if (!Rooms[numberOfRooms].capacity.includes(numberOfGguests)) {
      guestsSelect.setCustomValidity(Rooms[numberOfRooms].errorText);
    } else {
      guestsSelect.setCustomValidity('');
    }
  }

  function onLocationTypeFieldChange(evt) {
    var locationType = evt.target.value.toUpperCase();
    locationPriceField.setAttribute('min', MinPriceList[locationType]);
    locationPriceField.placeholder = MinPriceList[locationType];
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

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.httpRequest(POST_DATA_URL, POST_METHOD, disablePage, new FormData(adForm));
  }

  locationTypeField.addEventListener('change', onLocationTypeFieldChange);
  guestsSelect.addEventListener('change', onRoomsGuestsChange);
  roomsSelect.addEventListener('change', onRoomsGuestsChange);
  timeInSelect.addEventListener('change', onTimeSelectsChange);
  timeOutSelect.addEventListener('change', onTimeSelectsChange);
  adForm.addEventListener('submit', onFormSubmit);

  window.form = {
    adForm: adForm,
    addressField: addressField
  };
})();
