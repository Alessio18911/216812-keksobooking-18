'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var mapFiltersForm = document.querySelector('.map__filters');
  var housingFeaturesFilters = Array.from(document.querySelectorAll('#housing-features input[type="checkbox"]'));
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
    var locationValue = location.offer[property].toString();

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

  function onHousingFilterChange() {
    window.map.clearMap();
    var locations = window.map.pinsData.slice();
    var features = housingFeaturesFilters.filter(function (feature) {
      return feature.checked;
    })
    .map(function (inputChecked) {
      return inputChecked.value;
    });

    var valuesOfFilters = {
      'type': document.querySelector('#housing-type').value,
      'price': document.querySelector('#housing-price').value,
      'rooms': document.querySelector('#housing-rooms').value,
      'guests': document.querySelector('#housing-guests').value,
      'features': features
    };

    renderFilteredPins(valuesOfFilters, locations);
  }

  mapFiltersForm.addEventListener('change', debounce(onHousingFilterChange));

  window.filters = {
    mapFiltersForm: mapFiltersForm // 106
  };
})();
