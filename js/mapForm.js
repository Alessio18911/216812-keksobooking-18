'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
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

  function isPropEqual(props, property, location) {
    var propValue = props[property];
    var locationValue = location.offer[property].toString();

    return propValue === 'any' || propValue === locationValue ? true : false;
  }

  function isPriceInRange(props, location) {
    var locationPrice = location.offer.price;
    var propPrice = props.price;

    return propPrice === 'any' || locationPrice > priceMap[propPrice].min && locationPrice < priceMap[propPrice].max ? true : false;
  }

  function isFeaturesContain(props, location) {
    var locationFeatures = location.offer.features;
    var propsFeatures = props.features;

    return propsFeatures.every(function (feature) {
      return locationFeatures.includes(feature);
    });
  }

  function renderFilteredPins(props, locations) {
    var filteredLocations = locations.filter(function (location) {
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

    var valuesOfFilters = {
      'type': document.querySelector('#housing-type').value,
      'price': document.querySelector('#housing-price').value,
      'rooms': document.querySelector('#housing-rooms').value,
      'guests': document.querySelector('#housing-guests').value,
      'features': Array.from(document.querySelectorAll('#housing-features input[type="checkbox"]:checked')).map(function (inputChecked) {
        return inputChecked.value;
      })
    };

    renderFilteredPins(valuesOfFilters, window.map.pinsData.slice());
  }

  mapFilters.addEventListener('change', window.utils.debounce(onHousingFilterChange));

  window.mapForm = {
    mapFilters: mapFilters
  };
})();
