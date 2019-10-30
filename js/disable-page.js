'use strict';

(function () {
  var POST_DATA_URL = 'https://js.dump.academy/keksobooking';
  var POST_METHOD = 'POST';

  function onFormSubmit(evt) {
    evt.preventDefault(evt);
    window.backend.httpRequest(POST_DATA_URL, POST_METHOD, window.mainPin.togglePageAvailability, new FormData(window.form.adForm));
  }

  function onResetBtnClick() {
    window.map.pinsData = [];
    window.mainPin.togglePageAvailability();
  }

  window.form.adForm.addEventListener('submit', onFormSubmit);
  window.form.adFormReset.addEventListener('click', onResetBtnClick);
})();
