'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HALF_WIDTH = MAIN_PIN_WIDTH / 2;
  var MAIN_PIN_HEIGHT = 82;

  var addressField = document.querySelector('#address');
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
    var pinXCoord = mainPin.offsetLeft + parseInt(MAIN_PIN_HALF_WIDTH, 10);
    var pinYCoord = flag ? mainPin.offsetTop + MAIN_PIN_HEIGHT : mainPin.offsetTop + parseInt(MAIN_PIN_HALF_WIDTH, 10);

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
    window.form.adForm.reset();
    window.form.adForm.classList.add('ad-form--disabled');
    toggleDialogFieldsAvailability(isPageActive);
    window.map.clearMap();
    getCoordsOfMainPin(isPageActive);
  }

  function activatePage() {
    isPageActive = true;
    window.map.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    toggleDialogFieldsAvailability(isPageActive);
    getCoordsOfMainPin(isPageActive);
  }

  function createListOfLis(classes, listContainer, dataArray) {
    var fragment = document.createDocumentFragment();
    var arrayLength = dataArray.length;

    for (var i = 0; i < arrayLength; i++) {
      var element = document.createElement('li');
      var elementClasses = classes + dataArray[i];
      element.className = elementClasses;
      element.textContent = dataArray[i];

      fragment.appendChild(element);
    }

    listContainer.appendChild(fragment);
    return listContainer;
  }

  function createListOfAdImages(classes, listContainer, dataArray) {
    var fragment = document.createDocumentFragment();
    var arrayLength = dataArray.length;

    for (var i = 0; i < arrayLength; i++) {
      var element = document.createElement('img');
      element.src = dataArray[i];
      element.classList.add(classes);
      element.width = 45;
      element.height = 45;
      element.alt = 'Фотография жилья';

      fragment.appendChild(element);
    }

    listContainer.appendChild(fragment);
    return listContainer;
  }

  disablePage();

  window.util = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    mainPin: mainPin,
    isPageActive: isPageActive,
    activatePage: activatePage,
    createListOfLis: createListOfLis,
    createListOfAdImages: createListOfAdImages,
    disablePage: disablePage,
    getCoordsOfMainPin: getCoordsOfMainPin,
    loadPage: loadPage
  };
})();
