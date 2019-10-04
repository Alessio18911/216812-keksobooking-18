'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var pinsContainer = map.querySelector('.map__pins');

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
      'Заезд после ' + data.offer.checkIn + ', выезд до ' + data.offer.checkOut;
    advt.querySelector('.popup__description').textContent =
      data.offer.description;

    var accomodationFeatures = advt.querySelector('.popup__features');
    accomodationFeatures.textContent = '';
    createList('li', accomodationFeatures, data.offer.features);

    var accomodationPhotos = advt.querySelector('.popup__photos');
    accomodationPhotos.textContent = '';
    createList('img', accomodationPhotos, data.offer.photos);

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

  function createList(item, list, content) {
    var element;
    var elementClasses;
    var fragment = document.createDocumentFragment();
    var arrayLength = content.length;

    for (var i = 0; i < arrayLength; i++) {
      if (item === 'li') {
        element = document.createElement('li');
        elementClasses = 'popup__feature popup__feature--' + content[i];
        element.className = elementClasses;
        element.textContent = content[i];
      }

      if (item === 'img') {
        element = document.createElement('img');
        element.src = content[i];
        element.classList.add('popup__photo');
        element.width = 45;
        element.height = 45;
        element.alt = 'Фотография жилья';
      }

      fragment.appendChild(element);
    }

    list.appendChild(fragment);
    return list;
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
      var previousAdvt = map.querySelector('.map__card');
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
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < window.data.accomodationsAmount; j++) {
      fragment.appendChild(createPin(data[j]));
    }

    pinsContainer.appendChild(fragment);
  }

  renderPins(window.data.accomodations);

  window.map = {
    map: map
  };
})();
