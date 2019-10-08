'use strict';

(function () {
  var errorCodeMap = {
    '400': 'Неверный запрос',
    '401': 'Пользователь не авторизован',
    '404': 'Ничего не найдено'
  };

  function showError(errorMessage) {
    var mainPageContent = document.body.querySelector('main');
    var errorTemplate = document.querySelector('#error').content;
    var errorWindow = errorTemplate.cloneNode(true).querySelector('.error');
    var errorText = errorWindow.querySelector('.error__message');
    errorText.textContent = errorMessage;

    mainPageContent.appendChild(errorWindow);
    document.body.style.overflow = 'hidden';
  }

  function load(onLoad, onError) {
    var url = 'https://js.dump.academy/kksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(JSON.parse(xhr.responseText));
        return;
      }

      var error = errorCodeMap[xhr.status] ? errorCodeMap[xhr.status] : xhr.status;
      onError('Ошибка ' + error);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не выполнился за ' + xhr.timeout / 1000 + ' секунд');
    });
  }

  window.backend = {
    showError: showError,
    load: load
  };
})();
