'use strict';

var info = {
  'avatars': ['img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'],

  'titles': ['Хостел "У берега моря"',
    'B&B "У бабушки Марины"',
    'аппартаменты на улице маяка',
    'B&B "Крестьяне'
  ],

  'types': ['palace', 'flat', 'house', 'bungalow'],

  'checkIns': ['12:00', '13:00', '14:00'],

  'checkOuts': ['12:00', '13:00', '14:00'],

  'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],

  'descriptions': ['Мы открылись в этом году и, хотя находимся не в самом центре города, до нас нет проблем добраться: в 100 м. от хостела автобусная остановка,    с которой вы сможете за 15 минут доехать до исторического центра города. Автобус отправляется каждые 15 минут с раннего утра до позднего вечера',
    'Наш B&B - наша гордость! Дети выросли, дом опустел и мы решили превратить его в B&B: хороший способ познакомиться с новыми людьми, завести друзей и помочь соориентироваться в нашем прекрасном городе. Вы будете чувствовать себя, как дома: ведь наши гости - наши друзья! На завтрак вам подадут свежеиспечённые булочки с отменным кофе, а на ужин предложим типичные итальянские блюда! И это всё готовим мы сами!',
    'Наши аппартаменты находятся на улице, имя которой дал старый маяк у моря. Рядом нет никаких шумных заведений, так что релакс, тишина, в т.ч. поздним вечером и ранним утром гарантированы. Только вы и море, до которого рукой подать. Шум волн, врывающийся в открытое окно вечером, успокоит вас и вернёт нарушенный в суете будних дней сон. Само собой, насыщенный полезными веществами морской воздух вкупе со сном значительно улучшит ваше здоровье!',
    'Наше пристанище состоит из нескольких бунгало, расположенных на общей территории. Днём к вашим услугам бассейн. Питание 3-хразовое. Все продукты выращены нами, не содержат никаких вредных веществ. Само собой, готовим мы их день-в-день нашими руками!'
  ],

  'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var accomodationsAmount = info.avatars.length;
var accomodations = getLocationsList(info);
var map = document.querySelector('.map');
var pins = document.querySelector('.map__pins');
map.classList.remove('map--faded');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  var index = Math.floor(Math.random() * array.length);

  return array[index];
}

function getLocationsList(data) {
  var locations = [];

  for (var i = 0; i < accomodationsAmount; i++) {
    var xCoord = getRandomNumber(100, 1100);
    var yCoord = getRandomNumber(130, 630);

    var accomodation = {
      'author': {
        'avatar': data.avatars[i]
      },

      'offer': {
        'title': getRandomArrayElement(data.titles),
        'address': [xCoord, yCoord],
        'price': getRandomNumber(10, 40),
        'type': getRandomArrayElement(data.types),
        'rooms': getRandomNumber(1, 4),
        'guests': getRandomNumber(1, 10),
        'checkIn': getRandomArrayElement(data.checkIns),
        'checkOut': getRandomArrayElement(data.checkOuts),
        'features': getRandomArrayElement(data.features),
        'description': getRandomArrayElement(data.descriptions),
        'photos': data.photos
      },

      'location': {
        'x': xCoord,
        'y': yCoord
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

renderPins(accomodations);
