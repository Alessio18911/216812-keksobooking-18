'use strict';

(function () {
  var mainPageContent = document.body.querySelector('main');

  var errorCodeMap = {
    '400': 'Неверный запрос',
    '401': 'Пользователь не авторизован',
    '404': 'Ничего не найдено'
  };

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

    function onWindowErrorClick() {
      removeErrorPopup();
    }

    function onWindowErrorKeydown(evt) {
      if (evt.keyCode === 27) {
        removeErrorPopup();
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

    function onWindowSuccessClick() {
      removeSuccessPopup();
      document.removeEventListener('click', onWindowSuccessClick);
    }

    function onWindowSuccessKeydown(evt) {
      if (evt.keyCode === 27) {
        removeSuccessPopup();
        document.removeEventListener('click', onWindowSuccessClick);
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

  function httpRequest(url, method, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send(data);
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
        if (method === 'POST') {
          showSuccess();
        }
        return;
      }

      var error = errorCodeMap[xhr.status] ? errorCodeMap[xhr.status] : xhr.status;
      showError('Ошибка ' + error);
    });

    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', function () {
      showError('Запрос не выполнился за ' + xhr.timeout / 1000 + ' секунд');
    });
  }

  function load(data, onLoad) {
    var url = 'https://js.dump.academy/keksobooking/data';
    httpRequest(url, 'GET', data, onLoad);
  }

  function save(data, onLoad) {
    var url = 'https://js.dump.academy/keksobooking';
    httpRequest(url, 'POST', data, onLoad);
  }

  window.backend = {
    load: load,
    save: save
  };
})();
