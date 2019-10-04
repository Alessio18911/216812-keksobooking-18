'use strict';

(function () {
  function getRandomArrayElement(array) {
    var index = Math.floor(Math.random() * array.length);

    return array[index];
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  window.util = {
    getRandomArrayElement: getRandomArrayElement,
    getRandomNumber: getRandomNumber
  };
})();
