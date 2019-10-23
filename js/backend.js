'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var TIMEOUT = 10000;
  var MILLISECONDS_IN_MINUTE = 1000;
  var SUCCESS_CODE = 200;

  var errorCodeMap = {
    '400': 'Неверный запрос',
    '401': 'Пользователь не авторизован',
    '404': 'Ничего не найдено'
  };

  var mainPageContent = document.body.querySelector('main');

  function onXhrError() {
    showError('Произошла ошибка соединения');
  }

  function showError(errorMessage) {
    var errorTemplate = document.querySelector('#error').content;
    var errorWindow = errorTemplate.cloneNode(true).querySelector('.error');
    var errorText = errorWindow.querySelector('.error__message');
    var errorButton = errorWindow.querySelector('.error__button');
    errorText.textContent = errorMessage;

    mainPageContent.appendChild(errorWindow);
    document.body.style.overflow = 'hidden';

    function onWindowErrorClick(evt) {
      if (!evt.target.matches('.error__message')) {
        removeErrorPopup();
        document.removeEventListener('click', onWindowErrorClick);
      }
    }

    function onWindowErrorKeydown(evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        removeErrorPopup();
        document.removeEventListener('keydown', onWindowErrorKeydown);
      }
    }

    errorButton.addEventListener('click', onWindowErrorClick);
    document.addEventListener('click', onWindowErrorClick);
    document.addEventListener('keydown', onWindowErrorKeydown);
  }

  function showSuccess() {
    var template = document.querySelector('#success').content;
    var successWindow = template.cloneNode(true).querySelector('.success');

    mainPageContent.appendChild(successWindow);
    document.body.style.overflow = 'hidden';

    function onWindowSuccessClick(evt) {
      if (!evt.target.matches('.success__message')) {
        removeSuccessPopup();
        document.removeEventListener('click', onWindowSuccessClick);
      }
    }

    function onWindowSuccessKeydown(evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        removeSuccessPopup();
        document.removeEventListener('keydown', onWindowSuccessKeydown);
      }
    }

    document.addEventListener('click', onWindowSuccessClick);
    document.addEventListener('keydown', onWindowSuccessKeydown);
  }

  function removeSuccessPopup() {
    document.querySelector('.success').remove();
    document.body.style.overflow = 'auto';
  }

  function removeErrorPopup() {
    document.querySelector('.error').remove();
    document.body.style.overflow = 'auto';
  }

  function httpRequest(url, method, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send(data);
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        callback(JSON.parse(xhr.responseText));
        if (method === 'POST') { // 89
          showSuccess();
        }
        return;
      }

      var error = errorCodeMap[xhr.status] ? errorCodeMap[xhr.status] : xhr.status;
      showError('Ошибка ' + error);
    });

    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', function () {
      showError('Запрос не выполнился за ' + xhr.timeout / MILLISECONDS_IN_MINUTE + ' секунд');
    });
  }

  window.backend = {
    httpRequest: httpRequest
  };
})();
