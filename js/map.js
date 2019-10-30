'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HALF_WIDTH = PIN_WIDTH / 2;
  var PIN_HEIGHT = 70;
  var PINS_AMOUNT = 5;

  var translationMap = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

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
    var advert = template.cloneNode(true).querySelector('.map__card');
    var advertCloseButton = advert.querySelector('.popup__close');
    advertCloseButton.setAttribute('tabindex', '1');

    advert.querySelector('.popup__avatar').src = data.author.avatar;
    advert.querySelector('.popup__title').textContent = data.offer.title;
    advert.querySelector('.popup__text--address').textContent =
      data.offer.address;
    advert.querySelector('.popup__text--price').textContent =
      data.offer.price + '₽/ночь';
    advert.querySelector('.popup__type').textContent = translationMap[data.offer.type];
    advert.querySelector('.popup__text--capacity').textContent =
      data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    advert.querySelector('.popup__text--time').textContent =
      'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    advert.querySelector('.popup__description').textContent =
      data.offer.description;

    var accomodationFeatures = advert.querySelector('.popup__features');
    accomodationFeatures.textContent = '';
    window.utils.createListOfLis('popup__feature popup__feature--', accomodationFeatures, data.offer.features);

    var accomodationPhotos = advert.querySelector('.popup__photos');
    accomodationPhotos.textContent = '';
    window.utils.createListOfAdImages('popup__photo', accomodationPhotos, data.offer.photos);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEY_CODE) {
        advert.remove();
        window.utils.removeElementClass(document.querySelector('.map__pin--active'), 'map__pin--active');
      }
    });

    advertCloseButton.addEventListener('click', function (evt) {
      evt.target.parentNode.remove();
      window.utils.removeElementClass(document.querySelector('.map__pin--active'), 'map__pin--active');
    });

    return advert;
  }

  function createPin(elem) {
    var template = document.querySelector('#pin');
    var pin = template.cloneNode(true).content.querySelector('.map__pin');
    var pinImage = pin.querySelector('img');

    pinImage.src = elem.author.avatar;
    pinImage.alt = elem.offer.title;
    pin.style.left = elem.location.x - PIN_HALF_WIDTH + 'px';
    pin.style.top = elem.location.y - PIN_HEIGHT + 'px';

    pin.addEventListener('click', function () {
      window.utils.removeElementClass(document.querySelector('.map__pin--active'), 'map__pin--active');
      pin.classList.add('map__pin--active');
      renderAdvertisment(elem);
    });

    return pin;
  }

  function renderAdvertisment(data) {
    var previousAdvert = document.querySelector('.map__card');

    if (previousAdvert) {
      previousAdvert.remove();
    }

    var advertisment = createAdvertisment(data);
    map.insertBefore(advertisment, mapFiltersContainer);
  }

  function renderPins(data, method) {
    if (method !== 'POST') {
      var truncatedData = data.slice(0, PINS_AMOUNT);
      var fragment = document.createDocumentFragment();

      truncatedData.forEach(function (pin) {
        fragment.appendChild(createPin(pin));
      });

      pinsContainer.appendChild(fragment);
    }
  }

  window.map = {
    map: map,
    pinsData: pinsData,
    clearMap: clearMap,
    renderPins: renderPins
  };
})();
