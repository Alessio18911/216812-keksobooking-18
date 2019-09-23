'use strict';

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

  'addresses': ['407 8th Avenue South, Naples, FL',
    'Traversa via Nuova Marina 8, Porto di Napoli Molo Beverello, Napoli',
    'Ballycasey, Shannon',
    'Milatos, Milatos, 72400, Greece'
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
var pins = map.querySelector('.map__pins');
map.classList.remove('map--faded');

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
        'address': getRandomArrayElement(data.addresses),
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
        'x': getRandomNumber(100, 1100),
        'y': getRandomNumber(130, 630)
      }
    };

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

function createAdvertisment(elem) {
  var template = document.querySelector('#card').content;
  var advt = template.cloneNode(true).querySelector('.map__card');
  advt.querySelector('.popup__avatar').src = elem.author.avatar;
  advt.querySelector('.popup__title').textContent = elem.offer.title;
  advt.querySelector('.popup__text--address').textContent = elem.offer.address;
  advt.querySelector('.popup__text--price').textContent = elem.offer.price + '₽/ночь';
  advt.querySelector('.popup__type').textContent = elem.offer.type;
  advt.querySelector('.popup__text--capacity').textContent = elem.offer.rooms + ' комнаты для ' + elem.offer.guests + ' гостей';
  advt.querySelector('.popup__text--time').textContent = 'Заезд после ' + elem.offer.checkIn + ', выезд до ' + elem.offer.checkOut;
  advt.querySelector('.popup__description').textContent = elem.offer.description;

  var accomodationFeatures = advt.querySelector('.popup__features');
  accomodationFeatures.textContent = '';
  createList('li', accomodationFeatures, elem.offer.features);

  var accomodationPhotos = advt.querySelector('.popup__photos');
  accomodationPhotos.textContent = '';
  createList('img', accomodationPhotos, elem.offer.photos);

  return advt;
}

function renderAdvertisments(data) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < accomodationsAmount; i++) {
    fragment.appendChild(createAdvertisment(data[i]));
  }

  map.insertBefore(fragment, mapFiltersContainer);
}

renderPins(accomodations);
renderAdvertisments(accomodations);
