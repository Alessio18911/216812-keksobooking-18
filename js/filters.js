'use strict';

(function () {
  var mapFilterForm = document.querySelector('.map__filters');
  var locationTypeFilter = mapFilterForm.querySelector('#housing-type');
  var priceFilter = mapFilterForm.querySelector('#housing-price');
  var roomsFilter = mapFilterForm.querySelector('#housing-rooms');
  var guestsFilter = mapFilterForm.querySelector('#housing-guests');
  var wifiFilter = mapFilterForm.querySelector('#filter-wifi');
  var dishwasherFilter = mapFilterForm.querySelector('#filter-dishwasher');
  var parkingFilter = mapFilterForm.querySelector('#filter-parking');
  var washerFilter = mapFilterForm.querySelector('#filter-washer');
  var elevatorFilter = mapFilterForm.querySelector('#filter-elevator');
  var conditionerFilter = mapFilterForm.querySelector('#filter-conditioner');

  locationTypeFilter.addEventListener('change', function (evt) {
    window.util.clearMap();
    var type = evt.target.value;
    var filteredPins = window.map.pinsData.slice();

    if (type !== 'any') {
      filteredPins = filteredPins.filter(function (location) {
        return location.offer.type === type;
      });
    }

    window.map.renderPins(filteredPins);
  });
})();
