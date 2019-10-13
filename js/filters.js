'use strict';

(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilters = mapFiltersForm.querySelectorAll('select, input[type="checkbox"]');

  function getSelectKeyValue(select, props) {
    var selectId = select.id;
    var key = selectId.split('-')[1];
    props[key] = select.value;
  }

  function getCheckboxValue(checkbox, features) {
    features.push(checkbox.value);
  }

  function getFilteredPins(props, locations) {
    var filteredPins = [];

    locations.forEach(function (location) {
      for (var key in props) {
        if (key && props[key] !== 'any') {
          if (key !== 'features' && props[key] !== location.offer[key].toString()) {
            return;
          }

          if (key === 'features') {
            var featuresAmount = props[key].length;
            for (var feature = 0; feature < featuresAmount; feature++) {
              if (!location.offer.features.includes(props[key][feature])) {
                return;
              }
            }
          }
        }
      }

      filteredPins.push(location);
    });

    window.map.renderPins(filteredPins);
  }

  function onFiltersChange() {
    window.util.clearMap();
    var locations = window.map.pinsData.slice();
    var properties = {
      'type': 'any',
      'price': 'any',
      'rooms': 'any',
      'guests': 'any',
      'features': []
    };

    mapFilters.forEach(function (item) {
      if (item.tagName === 'SELECT') {
        getSelectKeyValue(item, properties);
      }

      if (item.tagName === 'INPUT' && item.checked) {
        getCheckboxValue(item, properties.features);
      }
    });

    getFilteredPins(properties, locations);
  }

  mapFiltersForm.addEventListener('change', onFiltersChange);
})();
