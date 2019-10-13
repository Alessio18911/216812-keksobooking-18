'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilters = mapFiltersForm.querySelectorAll('select, input[type="checkbox"]');
  var valuesOfFilters = {};
  var priceMap = {
    'low': [0, 10000],
    'middle': [10000, 50000],
    'high': [50000, Infinity]
  };

  function debounce(cb) {
    var lastTimeout;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    };
  }

  function renderFilteredPins(props, locations) {
    var filteredLocations = [];

    locations.forEach(function (location) {
      for (var key in props) {
        if (key && props[key] !== 'any') {
          var propValue = props[key];
          var locationValue = location.offer[key];
          if (key !== 'features' && key !== 'price' && propValue !== locationValue.toString()) {
            return;
          }

          if (key === 'price') {
            var priceRange = priceMap[propValue];
            var minPrice = priceRange[0];
            var maxPrice = priceRange[1];
            if (locationValue < minPrice || locationValue > maxPrice) {
              return;
            }
          }

          if (key === 'features') {
            var featuresNumber = propValue.length;
            for (var i = 0; i < featuresNumber; i++) {
              if (!locationValue.includes(propValue[i])) {
                return;
              }
            }
          }
        }
      }

      filteredLocations.push(location);
    });

    window.map.renderPins(filteredLocations);
  }

  function updateLocations() {
    window.map.clearMap();
    var locations = window.map.pinsData.slice();
    valuesOfFilters = {
      'type': 'any',
      'price': 'any',
      'rooms': 'any',
      'guests': 'any',
      'features': []
    };

    mapFilters.forEach(function (filter) {
      if (filter.matches('.map__checkbox') && filter.checked) {
        valuesOfFilters.features.push(filter.value);
      }

      if (filter.matches('.map__filter')) {
        var selectId = filter.id;
        var key = selectId.split('-')[1];
        valuesOfFilters[key] = filter.value;
      }
    });

    renderFilteredPins(valuesOfFilters, locations);
  }

  mapFiltersForm.addEventListener('change', debounce(updateLocations));

  window.filters = {
    mapFiltersForm: mapFiltersForm
  };
})();
