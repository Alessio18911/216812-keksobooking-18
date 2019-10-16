'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var pinsData = [];
  var pinsContainer = map.querySelector('.map__pins');

  function clearMap() {
    var itemsToClear = document.querySelectorAll('.map__pin:not(.map__pin--main), .map__card');
    itemsToClear.forEach(function (item) {
      item.remove();
    });
  }

  function createAdvertisment(data) {
    var template = document.querySelector('#card').content;
    var advt = template.cloneNode(true).querySelector('.map__card');
    var advtCloseButton = advt.querySelector('.popup__close');
    advtCloseButton.setAttribute('tabindex', '1');

    advt.querySelector('.popup__avatar').src = data.author.avatar;
    advt.querySelector('.popup__title').textContent = data.offer.title;
    advt.querySelector('.popup__text--address').textContent =
      data.offer.address;
    advt.querySelector('.popup__text--price').textContent =
      data.offer.price + '₽/ночь';
    advt.querySelector('.popup__type').textContent = data.offer.type;
    advt.querySelector('.popup__text--capacity').textContent =
      data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    advt.querySelector('.popup__text--time').textContent =
      'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    advt.querySelector('.popup__description').textContent =
      data.offer.description;

    var accomodationFeatures = advt.querySelector('.popup__features');
    accomodationFeatures.textContent = '';
    window.util.createList('li', 'popup__feature popup__feature--', accomodationFeatures, data.offer.features);

    var accomodationPhotos = advt.querySelector('.popup__photos');
    accomodationPhotos.textContent = '';
    window.util.createList('img', 'popup__photo', accomodationPhotos, data.offer.photos);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        advt.remove();
      }
    });

    advtCloseButton.addEventListener('click', function (evt) {
      evt.target.parentNode.remove();
    });

    return advt;
  }

  function createPin(elem) {
    var template = document.querySelector('#pin');
    var pin = template.cloneNode(true).content.querySelector('.map__pin');
    var pinImage = pin.querySelector('img');

    pinImage.src = elem.author.avatar;
    pinImage.alt = elem.offer.title;
    pin.style.left = elem.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = elem.location.y - PIN_HEIGHT + 'px';

    pin.addEventListener('click', function () {
      var previousAdvt = document.querySelector('.map__card');
      if (previousAdvt) {
        previousAdvt.remove();
      }

      renderAdvertisment(elem);
    });

    return pin;
  }

  function renderAdvertisment(data) {
    var advertisment = createAdvertisment(data);
    map.insertBefore(advertisment, mapFiltersContainer);
  }

  function renderPins(data) {
    var truncatedData = limitNumberOfPins(data, 5);
    var fragment = document.createDocumentFragment();

    truncatedData.forEach(function (pin) {
      fragment.appendChild(createPin(pin));
    });

    pinsContainer.appendChild(fragment);
  }

  function limitNumberOfPins(pins, limit) {
    return pins.slice(0, limit);
  }

  window.map = {
    map: map,
    pinsData: pinsData,
    clearMap: clearMap,
    renderPins: renderPins
  };
})();
