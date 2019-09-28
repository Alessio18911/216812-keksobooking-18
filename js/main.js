'use strict';
//аварийное восстановление

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  var index = Math.floor(Math.random() * array.length);

  return array[index];
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

function getLocationsList(data) {
  var locations = [];

  for (var i = 0; i < accomodationsAmount; i++) {
    var accomodation = {
      'author': {
        'avatar': data.avatars[i]
      },

      'offer': {
        'title': getRandomArrayElement(data.titles),
        'price': getRandomNumber(10, 40),
        'type': getRandomArrayElement(data.types),
        'rooms': getRandomNumber(1, 4),
        'guests': getRandomNumber(1, 10),
        'checkIn': getRandomArrayElement(data.checkIns),
        'checkOut': getRandomArrayElement(data.checkOuts),
        'features': getRandomArrayElement(data.features),
        'description': getRandomArrayElement(data.descriptions),
        'photos': getRandomArrayElement(data.photos)
      },

      'location': {
        'x': getRandomNumber(0, 1200),
        'y': getRandomNumber(130, 630)
      }
    };

    accomodation.offer.address = accomodation.location.x + ', ' + accomodation.location.y;

    locations.push(accomodation);
  }

  return locations;
}

function createPin(elem) {
  var template = document.querySelector('#pin');
  var pin = template.cloneNode(true).content.querySelector('.map__pin');
  var pinImage = pin.querySelector('img');

  pinImage.src = elem.author.avatar;
  pinImage.alt = elem.offer.title;
  pin.style.left = elem.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = elem.location.y - PIN_HEIGHT + 'px';

  return pin;
}

function renderPins(data) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < accomodationsAmount; j++) {
    fragment.appendChild(createPin(data[j]));
  }

  pins.appendChild(fragment);
}

function createAdvertisment(data) {
  var template = document.querySelector('#card').content;
  var advt = template.cloneNode(true).querySelector('.map__card');
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

  return advt;
}

function renderAdvertisment(data) {
  var advertisment = createAdvertisment(data);
  map.insertBefore(advertisment, mapFiltersContainer);
}

function disableFormFields(fields) {
  fields.forEach(function (item) {
    item.setAttribute('disabled', true);
  });
}

function activateFormFields(fields) {
  fields.forEach(function (item) {
    item.removeAttribute('disabled');
  });
}

function activatePage() {
  activateFormFields(mapFiltersFormFields);
  activateFormFields(adFormFields);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
}

var INFO = {
  'avatars': ['img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'],

  'titles': ['Хостел "У берега моря"',
    'B&B "У бабушки Марии"',
    'Аппартаменты на улице маяка',
    'B&B "Крестьяне'
  ],

  'types': ['palace', 'flat', 'house', 'bungalow'],

  'checkIns': ['12:00', '13:00', '14:00'],

  'checkOuts': ['12:00', '13:00', '14:00'],

  'features': [['dishwasher', 'parking', 'elevator'],
    ['wifi', 'conditioner'],
    ['dishwasher', 'parking', 'washer', 'conditioner'],
    ['wifi', 'parking', 'washer', 'elevator', 'conditioner'],
    ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  ],

  'descriptions': ['Мы открылись в этом году и, хотя находимся не в самом центре города, нет проблем до нас добраться: в 100 м. от хостела автобусная остановка,    с которой вы сможете за 15 минут доехать до исторического центра города. Автобус отправляется каждые 15 минут с раннего утра до позднего вечера',
    'Наш B&B - наша гордость! Дети выросли, дом опустел и мы решили превратить его в B&B: хороший способ познакомиться с новыми людьми, завести друзей и помочь соориентироваться в нашем прекрасном городе. Вы будете чувствовать себя, как дома: ведь наши гости - наши друзья! На завтрак подадим свежеиспечённые булочки с отменным кофе, а на ужин предложим типичные итальянские блюда! И это всё готовим мы сами!',
    'Наши аппартаменты находятся на улице, имя которой дал старый маяк у моря. Рядом нет никаких шумных заведений, так что релакс, тишина, в т.ч. поздним вечером и ранним утром, гарантированы. Только вы и море, до которого рукой подать. Шум волн, врывающийся в открытое окно вечером, успокоит нервы и вернёт нарушенный в суете будних дней сон. Само собой, насыщенный полезными веществами морской воздух вкупе со сном значительно улучшит ваше здоровье!',
    'Наше пристанище состоит из нескольких бунгало, расположенных на общей территории. Днём к вашим услугам бассейн. Питание 3-хразовое. Все продукты выращены нами, не содержат никаких вредных веществ. Само собой, готовим мы их день-в-день нашими руками!'
  ],

  'photos': [['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],

  ['http://o0.github.io/assets/images/tokyo/hotel2.jpg'],

  ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],

  ['http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],

  ['http://o0.github.io/assets/images/tokyo/hotel3.jpg']]
};

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var accomodationsAmount = INFO.avatars.length;
var accomodations = getLocationsList(INFO);
var map = document.querySelector('.map');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var mapFiltersFormFields = mapFiltersContainer.querySelectorAll('select, fieldset');
var pins = map.querySelector('.map__pins');
var mainPin = pins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');

renderPins(accomodations);
renderAdvertisment(accomodations[0]);
disableFormFields(mapFiltersFormFields);
disableFormFields(adFormFields);

mainPin.addEventListener('mousedown', function () {
  activatePage();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activatePage();
  }
});
