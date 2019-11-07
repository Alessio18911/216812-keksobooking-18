'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var ADVERT_IMAGE_WIDTH = 45;
  var ADVERT_IMAGE_HEIGHT = 45;

  var mainPageContent = document.body.querySelector('main');
  var dialogFields = document.querySelectorAll('fieldset, input, select, textarea');

  function createListOfLis(classes, listContainer, data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (item) {
      var element = document.createElement('li');
      var elementClasses = classes + item;
      element.className = elementClasses;
      element.textContent = item;
      fragment.appendChild(element);
    });

    listContainer.appendChild(fragment);
    return listContainer;
  }

  function createListOfAdImages(classes, listContainer, data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (img) {
      var image = document.createElement('img');
      image.src = img;
      image.classList.add(classes);
      image.width = ADVERT_IMAGE_WIDTH;
      image.height = ADVERT_IMAGE_HEIGHT;
      image.alt = 'Фотография жилья';
      fragment.appendChild(image);
    });

    listContainer.appendChild(fragment);
    return listContainer;
  }

  function toggleDialogFieldsAvailability(flag) {
    dialogFields.forEach(function (item) {
      item.disabled = !flag;
    });
  }

  function debounce(cb) {
    var lastTimeout;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    };
  }

  function removeElementClass(elem, className) {
    if (elem) {
      elem.classList.remove(className);
    }
  }

  function onWindowSuccessClick(evt) {
    if (!evt.target.matches('.success__message')) {
      removeSuccessPopup();
      document.removeEventListener('click', onWindowSuccessClick);
      document.removeEventListener('keydown', onWindowSuccessKeydown);
    }
  }

  function onWindowSuccessKeydown(evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      removeSuccessPopup();
      document.removeEventListener('click', onWindowSuccessClick);
      document.removeEventListener('keydown', onWindowSuccessKeydown);
    }
  }

  function showSuccess() {
    var template = document.querySelector('#success').content;
    var successWindow = template.cloneNode(true).querySelector('.success');

    mainPageContent.appendChild(successWindow);
    document.body.style.overflow = 'hidden';
    document.addEventListener('click', onWindowSuccessClick);
    document.addEventListener('keydown', onWindowSuccessKeydown);
  }

  function removeSuccessPopup() {
    var successWindow = document.querySelector('.success');

    if (successWindow) {
      successWindow.remove();
      document.body.style.overflow = 'auto';
    }
  }

  window.utils = {
    ESC_KEY_CODE: ESC_KEY_CODE,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    mainPageContent: mainPageContent,
    debounce: debounce,
    createListOfLis: createListOfLis,
    createListOfAdImages: createListOfAdImages,
    removeElementClass: removeElementClass,
    showSuccess: showSuccess,
    toggleDialogFieldsAvailability: toggleDialogFieldsAvailability
  };
})();
