'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');
  var locationTypeField = adForm.querySelector('#type');
  var locationPriceField = adForm.querySelector('#price');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomsSelect = adForm.querySelector('#room_number');
  var guestsSelect = adForm.querySelector('#capacity');

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
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  function fillAddressField(pin, pinWidth, pinHeight, isPageActive) {
    var pinXCoord = pin.offsetLeft + parseInt(pinWidth / 2, 10);
    var pinYCoord = !isPageActive ? pin.offsetTop + parseInt(pinWidth / 2, 10) : pin.offsetTop + pinHeight;

    addressField.value = pinXCoord + ', ' + pinYCoord;
  }

  function setLocationMinPrice(minPrice) {
    locationPriceField.setAttribute('min', minPrice);
    locationPriceField.placeholder = minPrice;
  }

  function validateRoomsCapacity() {
    var numberOfRooms = roomsSelect.value;
    var numberOfGguests = guestsSelect.value;

    if (!rooms[numberOfRooms].capacity.includes(numberOfGguests)) {
      guestsSelect.setCustomValidity(rooms[numberOfRooms].errorText);
    } else {
      guestsSelect.setCustomValidity('');
    }
  }

  validateRoomsCapacity();

  locationTypeField.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'bungalo':
        setLocationMinPrice(minPriceList.bungalow);
        break;
      case 'flat':
        setLocationMinPrice(minPriceList.flat);
        break;

      case 'house':
        setLocationMinPrice(minPriceList.house);
        break;

      case 'palace':
        setLocationMinPrice(minPriceList.palace);
        break;
    }
  });

  guestsSelect.addEventListener('change', validateRoomsCapacity);
  roomsSelect.addEventListener('change', validateRoomsCapacity);

  timeInSelect.addEventListener('change', function (evt) {
    timeOutSelect.value = evt.target.value;
  });

  timeOutSelect.addEventListener('change', function (evt) {
    timeInSelect.value = evt.target.value;
  });


  window.form = {
    adForm: adForm,
    fillAddressField: fillAddressField
  };
})();
