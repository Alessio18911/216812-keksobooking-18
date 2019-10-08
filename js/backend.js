'use strict';

(function () {
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
    var url = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onLoad(JSON.parse(xhr.responseText));
          break;

        case 400:
          error = 'Неверный запрос';
          break;

        case 401:
          error = 'Пользователь не авторизован';
          break;

        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Ошибка ' + xhr.status;
      }

      if (error) {
        onError(error);
      }
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
