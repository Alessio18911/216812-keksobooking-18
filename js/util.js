'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 82;

  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');
  var dialogFields = document.querySelectorAll('fieldset, input, select, textarea');
  var mainPin = document.querySelector('.map__pin--main');
  var isPageActive = false;
  var mainPinInitialTop = window.getComputedStyle(mainPin).getPropertyValue('top');
  var mainPinInitialLeft = window.getComputedStyle(mainPin).getPropertyValue('left');

  function loadPage(data) {
    window.map.pinsData = data;
    activatePage();
    window.map.renderPins(data);
  }

  function getCoordsOfMainPin(flag) {
    var pinXCoord = mainPin.offsetLeft + parseInt(MAIN_PIN_WIDTH / 2, 10);
    var pinYCoord = flag ? mainPin.offsetTop + MAIN_PIN_HEIGHT : mainPin.offsetTop + parseInt(MAIN_PIN_WIDTH / 2, 10);

    addressField.value = pinXCoord + ', ' + pinYCoord;
  }

  function toggleDialogFieldsAvailability(flag) {
    if (!flag) {
      dialogFields.forEach(function (item) {
        item.setAttribute('disabled', true);
      });

      return;
    }

    dialogFields.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  }

  function disablePage() {
    isPageActive = false;
    mainPin.style.top = mainPinInitialTop;
    mainPin.style.left = mainPinInitialLeft;
    window.map.map.classList.add('map--faded');
    window.filters.mapFiltersForm.reset();
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    toggleDialogFieldsAvailability(isPageActive);
    window.map.clearMap();
    getCoordsOfMainPin(isPageActive);
  }

  function activatePage() {
    isPageActive = true;
    window.map.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    toggleDialogFieldsAvailability(isPageActive);
    getCoordsOfMainPin(isPageActive);
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

  disablePage();

  window.util = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    adForm: adForm,
    mainPin: mainPin,
    isPageActive: isPageActive,
    activatePage: activatePage,
    createList: createList,
    disablePage: disablePage,
    getCoordsOfMainPin: getCoordsOfMainPin,
    loadPage: loadPage
  };
})();
