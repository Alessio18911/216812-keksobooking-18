'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 82;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');
  var dialogFields = document.querySelectorAll('fieldset, input, select, textarea');
  var mainPin = document.querySelector('.map__pin--main');
  var isPageActive = false;
  var mainPinInitialTop = window.getComputedStyle(mainPin).getPropertyValue('top');
  var mainPinInitialLeft = window.getComputedStyle(mainPin).getPropertyValue('left');

  function getCoordsOfMainPin(flag) {
    var pinXCoord = mainPin.offsetLeft + parseInt(MAIN_PIN_WIDTH / 2, 10);
    var pinYCoord = !flag ? mainPin.offsetTop + parseInt(MAIN_PIN_WIDTH / 2, 10) : mainPin.offsetTop + MAIN_PIN_HEIGHT;

    addressField.value = pinXCoord + ', ' + pinYCoord;

    return {
      x: pinXCoord,
      y: pinYCoord
    };
  }

  function clearMap() {
    var itemsToClear = document.querySelectorAll('.map__pin:not(.map__pin--main), .map__card');
    itemsToClear.forEach(function (item) {
      item.remove();
    });
  }

  function togglePageAvailability(flag) {
    if (!flag) {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      adForm.reset();
      dialogFields.forEach(function (item) {
        item.setAttribute('disabled', true);
      });
      clearMap();
      mainPin.style.top = mainPinInitialTop;
      mainPin.style.left = mainPinInitialLeft;
      getCoordsOfMainPin(flag);
      return;
    }

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    dialogFields.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    getCoordsOfMainPin(!flag);
  }

  function createList(item, list, content) {
    var element;
    var elementClasses;
    var fragment = document.createDocumentFragment();
    var arrayLength = content.length;

    for (var i = 0; i < arrayLength; i++) {
      if (item === 'li') {
        element = document.createElement('li');
        elementClasses = 'popup__feature popup__feature--' + content[i];
        element.className = elementClasses;
        element.textContent = content[i];
      }

      if (item === 'img') {
        element = document.createElement('img');
        element.src = content[i];
        element.classList.add('popup__photo');
        element.width = 45;
        element.height = 45;
        element.alt = 'Фотография жилья';
      }

      fragment.appendChild(element);
    }

    list.appendChild(fragment);
    return list;
  }

  togglePageAvailability(isPageActive);

  window.util = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    map: map,
    adForm: adForm,
    mainPin: mainPin,
    isPageActive: isPageActive,
    dialogFields: dialogFields,
    createList: createList,
    togglePageAvailability: togglePageAvailability,
    getCoordsOfMainPin: getCoordsOfMainPin
  };
})();
