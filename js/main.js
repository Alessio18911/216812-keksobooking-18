'use strict';

function activateFormFields(fields) {
  fields.forEach(function (item) {
    item.removeAttribute('disabled');
  });
}

function activatePage() {
  isPageActive = true;
  activateFormFields(mapFiltersFormFields);
  activateFormFields(adFormFields);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  fillAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);
}

function createAdvertisment(data) {
  var template = document.querySelector('#card').content;
  var advt = template.cloneNode(true).querySelector('.map__card');
  var advtCloseButton = advt.querySelector('.popup__close');
  advtCloseButton.setAttribute('tabindex', '1');

  advt.querySelector('.popup__avatar').src = data.author.avatar;
  advt.querySelector('.popup__title').textContent = data.offer.title;
  advt.querySelector('.popup__text--address').textContent = data.offer.address;
  advt.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
  advt.querySelector('.popup__type').textContent = data.offer.type;
  advt.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  advt.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkIn + ', выезд до ' + data.offer.checkOut;
  advt.querySelector('.popup__description').textContent = data.offer.description;

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

function disableFormFields(fields) {
  fields.forEach(function (item) {
    item.setAttribute('disabled', true);
  });
}

function fillAddressField(pin, pinWidth, pinHeight, isPageActive) {
  var pinXCoord = pin.offsetLeft + parseInt(pinWidth / 2, 10);
  var pinYCoord = !isPageActive ? pin.offsetTop + parseInt(pinWidth / 2, 10) : pin.offsetTop + pinHeight;

  addressField.value = pinXCoord + ', ' + pinYCoord;
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

function setLocationMinPrice(minPrice) {
  locationPriceFiedl.setAttribute('min', minPrice);
  locationPriceFiedl.placeholder = minPrice;
}

function validateRoomsCapacity() {
  var numberOfRooms = roomsSelect.value;
  var numberOfGguests = guestsSelect.value;

  if (!rooms[numberOfRooms].capacity.includes(numberOfGguests)) {
    guestsSelect.setCustomValidity(rooms[numberOfRooms].errorText);
  } else {
    guestsSelect.setCustomValidity('');
  }
}

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 87;

var map = document.querySelector('.map');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var mapFiltersFormFields = mapFiltersContainer.querySelectorAll('select, fieldset');
var pinsContainer = map.querySelector('.map__pins');
var mainPin = pinsContainer.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var addressField = adForm.querySelector('#address');
var locationTypeField = adForm.querySelector('#type');
var locationPriceFiedl = adForm.querySelector('#price');
var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');
var isPageActive = false;
var roomsSelect = adForm.querySelector('#room_number');
var guestsSelect = adForm.querySelector('#capacity');
var rooms = {
  '1': {
    capacity: ['1'],
    errorText: 'В 1 комнате может быть не более 1 гостя'
  },

  '2': {
    capacity: ['1', '2'],
    errorText: 'В 2 комнатах может быть не более 2 гостей'
  },

  '3': {
    capacity: ['1', '2', '3'],
    errorText: 'В 3 комнатах может быть не более 3 гостей'
  },

  '100': {
    capacity: ['0'],
    errorText: '100 комнат не для гостей'
  },
};
var minPriceList = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

renderPins(window.data.accomodations);
disableFormFields(mapFiltersFormFields);
disableFormFields(adFormFields);
fillAddressField(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, isPageActive);
validateRoomsCapacity();

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activatePage();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activatePage();
  }
});

locationTypeField.addEventListener('change', function (evt) {
  switch (evt.target.value) {
    case 'bungalo':
      setLocationMinPrice(minPriceList.bungalow);
      break;
    case 'flat':
      setLocationMinPrice(minPriceList.flat);
      break;

    case 'house':
      setLocationMinPrice(minPriceList.house);
      break;

    case 'palace':
      setLocationMinPrice(minPriceList.palace);
      break;
  }
});

timeInSelect.addEventListener('change', function (evt) {
  timeOutSelect.value = evt.target.value;
});

timeOutSelect.addEventListener('change', function (evt) {
  timeInSelect.value = evt.target.value;
});

roomsSelect.addEventListener('change', validateRoomsCapacity);
guestsSelect.addEventListener('change', validateRoomsCapacity);
