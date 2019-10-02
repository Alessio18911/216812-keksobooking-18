'use strict';

(function () {
  var INFO = {
    avatars: [
      'img/avatars/user01.png',
      'img/avatars/user02.png',
      'img/avatars/user03.png',
      'img/avatars/user04.png',
      'img/avatars/user05.png',
      'img/avatars/user06.png',
      'img/avatars/user07.png',
      'img/avatars/user08.png'
    ],

    titles: [
      'Хостел У берега моря',
      'B&B У бабушки Марии',
      'Аппартаменты на улице маяка',
      'B&B Крестьяне'
    ],

    types: ['palace', 'flat', 'house', 'bungalow'],

    checkIns: ['12:00', '13:00', '14:00'],

    checkOuts: ['12:00', '13:00', '14:00'],

    features: [
      ['dishwasher', 'parking', 'elevator'],
      ['wifi', 'conditioner'],
      ['dishwasher', 'parking', 'washer', 'conditioner'],
      ['wifi', 'parking', 'washer', 'elevator', 'conditioner'],
      ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
    ],

    descriptions: [
      'Мы открылись в этом году и, хотя находимся не в самом центре города, нет проблем до нас добраться: в 100 м. от хостела автобусная остановка,    с которой вы сможете за 15 минут доехать до исторического центра города. Автобус отправляется каждые 15 минут с раннего утра до позднего вечера',
      'Наш B&B - наша гордость! Дети выросли, дом опустел и мы решили превратить его в B&B: хороший способ познакомиться с новыми людьми, завести друзей и помочь соориентироваться в нашем прекрасном городе. Вы будете чувствовать себя, как дома: ведь наши гости - наши друзья! На завтрак подадим свежеиспечённые булочки с отменным кофе, а на ужин предложим типичные итальянские блюда! И это всё готовим мы сами!',
      'Наши аппартаменты находятся на улице, имя которой дал старый маяк у моря. Рядом нет никаких шумных заведений, так что релакс, тишина, в т.ч. поздним вечером и ранним утром, гарантированы. Только вы и море, до которого рукой подать. Шум волн, врывающийся в открытое окно вечером, успокоит нервы и вернёт нарушенный в суете будних дней сон. Само собой, насыщенный полезными веществами морской воздух вкупе со сном значительно улучшит ваше здоровье!',
      'Наше пристанище состоит из нескольких бунгало, расположенных на общей территории. Днём к вашим услугам бассейн. Питание 3-хразовое. Все продукты выращены нами, не содержат никаких вредных веществ. Само собой, готовим мы их день-в-день нашими руками!'
    ],

    photos: [
      [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ],

      ['http://o0.github.io/assets/images/tokyo/hotel2.jpg'],

      [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ],

      [
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ],

      ['http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    ]
  };

  var accomodations = getLocationsList(INFO);
  var accomodationsAmount = INFO.avatars.length;

  function getLocationsList(data) {
    var locations = [];

    for (var i = 0; i < accomodationsAmount; i++) {
      var accomodation = {
        author: {
          avatar: data.avatars[i]
        },

        id: i + 1,

        offer: {
          title: window.util.getRandomArrayElement(data.titles),
          price: window.util.getRandomNumber(10, 40),
          type: window.util.getRandomArrayElement(data.types),
          rooms: window.util.getRandomNumber(1, 4),
          guests: window.util.getRandomNumber(1, 10),
          checkIn: window.util.getRandomArrayElement(data.checkIns),
          checkOut: window.util.getRandomArrayElement(data.checkOuts),
          features: window.util.getRandomArrayElement(data.features),
          description: window.util.getRandomArrayElement(data.descriptions),
          photos: window.util.getRandomArrayElement(data.photos)
        },

        location: {
          x: window.util.getRandomNumber(0, 1200),
          y: window.util.getRandomNumber(130, 630)
        }
      };

      accomodation.offer.address =
        accomodation.location.x + ', ' + accomodation.location.y;

      locations.push(accomodation);
    }

    return locations;
  }

  window.data = {
    accomodations: accomodations,
    accomodationsAmount: accomodationsAmount,
    getLocationsList: getLocationsList
  };
})();
