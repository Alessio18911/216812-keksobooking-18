'use strict';

(function () {
  var TIMEOUT = 10000;
  var MILLISECONDS_PER_MINUTE = 1000;
  var SUCCESS_CODE = 200;

  var errorCodeMap = {
    '400': 'Неверный запрос',
    '401': 'Пользователь не авторизован',
    '404': 'Ничего не найдено'
  };

  function onXhrError() {
    showError('Произошла ошибка соединения');
  }

  function removeErrorPopup() {
    var errorWindow = document.querySelector('.error');

    if (errorWindow) {
      errorWindow.remove();
      document.body.style.overflow = 'auto';
    }
  }

  function onWindowErrorClick(evt) {
    if (!evt.target.matches('.error__message')) {
      removeErrorPopup();
      document.removeEventListener('keydown', onWindowErrorKeydown);
    }
  }

  function onWindowErrorKeydown(evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      removeErrorPopup();
      document.removeEventListener('keydown', onWindowErrorKeydown);
    }
  }

  function showError(errorMessage) {
    var errorTemplate = document.querySelector('#error').content;
    var errorWindow = errorTemplate.cloneNode(true).querySelector('.error');
    var errorText = errorWindow.querySelector('.error__message');
    var errorButton = errorWindow.querySelector('.error__button');
    errorText.textContent = errorMessage;

    window.utils.mainPageContent.appendChild(errorWindow);
    document.body.style.overflow = 'hidden';

    errorWindow.addEventListener('click', onWindowErrorClick);
    errorButton.addEventListener('click', onWindowErrorClick);
    document.addEventListener('keydown', onWindowErrorKeydown);
  }

  function httpRequest(url, method, cb, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send(data);
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESS_CODE:
          cb(JSON.parse(xhr.responseText), method);
          break;

        default:
          var error = errorCodeMap[xhr.status] ? errorCodeMap[xhr.status] : xhr.status;
          showError('Ошибка ' + error);
      }
    });

    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', function () {
      showError('Запрос не выполнился за ' + xhr.timeout / MILLISECONDS_PER_MINUTE + ' секунд');
    });
  }

  window.backend = {
    httpRequest: httpRequest
  };
})();
