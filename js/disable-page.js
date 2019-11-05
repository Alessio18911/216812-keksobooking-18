'use strict';

(function () {
  var POST_DATA_URL = 'https://js.dmp.academy/keksobooking';

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.httpRequest(POST_DATA_URL, 'POST', window.mainPin.togglePageAvailability, new FormData(window.form.adForm));
  }

  function onResetBtnClick() {
    window.map.pinsData = [];
    window.mainPin.togglePageAvailability();
  }

  window.form.adForm.addEventListener('submit', onFormSubmit);
  window.form.adFormReset.addEventListener('click', onResetBtnClick);
})();
