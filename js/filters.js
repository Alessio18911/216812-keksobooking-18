'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilters = mapFiltersForm.querySelectorAll('select, input[type="checkbox"]');
  var valuesOfFilters = {};
  var priceMap = {
    'low': {
      min: 0,
      max: 10000
    },

    'middle': {
      min: 10000,
      max: 50000
    },

    'high': {
      min: 50000,
      max: Infinity
    }
  };

  function debounce(cb) { // 15
    var lastTimeout;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    };
  }

  function isPropEqual(props, property, location) {
    var propValue = props[property];
    var locationValue = location.offer[property];

    if (property === 'rooms' || property === 'guests') { // 31
      locationValue = locationValue.toString();
    }

    if (propValue !== 'any' && propValue !== locationValue) {
      return false;
    }

    return true;
  }

  function isPriceInRange(props, location) {
    var locationPrice = location.offer.price;
    var propPrice = props.price;
    if (propPrice !== 'any') {
      if (locationPrice < priceMap[propPrice].min || locationPrice > priceMap[propPrice].max) {
        return false;
      }
    }

    return true;
  }

  function isFeaturesContain(props, location) {
    var locationFeatures = location.offer.features;
    var propsFeatures = props.features;

    return propsFeatures.every(function (feature) {
      return locationFeatures.includes(feature);
    });
  }

  function renderFilteredPins(props, locations) {
    var filteredLocations = [];

    filteredLocations = locations.filter(function (location) {
      return isPropEqual(props, 'type', location) &&
             isPriceInRange(props, location) &&
             isPropEqual(props, 'rooms', location) &&
             isPropEqual(props, 'guests', location) &&
             isFeaturesContain(props, location);
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

    mapFilters.forEach(function (filter) { // 88
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
    mapFiltersForm: mapFiltersForm // 106
  };
})();
