'use strict';

(function () {
  var dialogFields = document.querySelectorAll('input, select, textarea');
  var isPageActive = false;

  function activatePage(flag, fields, map, form) {
    toggleDialogFieldsAvailability(fields, flag);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
  }

  function toggleDialogFieldsAvailability(fields, flag) {
    if (!flag) {
      fields.forEach(function (item) {
        item.setAttribute('disabled', true);
      });

      return;
    }

    fields.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  }

  toggleDialogFieldsAvailability(dialogFields, isPageActive);

  window.availability = {
    isPageActive: isPageActive,
    dialogFields: dialogFields,
    activatePage: activatePage,
    toggleDialogFieldsAvailability: toggleDialogFieldsAvailability
  };
})();
