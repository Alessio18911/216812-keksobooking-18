'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var dialogFields = document.querySelectorAll('fieldset, select, textarea');
  var isPageActive = false;

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
      dialogFields.forEach(function (item) {
        item.setAttribute('disabled', true);
      });
      clearMap();
      return;
    }

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    dialogFields.forEach(function (item) {
      item.removeAttribute('disabled');
    });
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
    map: map,
    adForm: adForm,
    dialogFields: dialogFields,
    isPageActive: isPageActive,
    createList: createList,
    togglePageAvailability: togglePageAvailability
  };
})();
