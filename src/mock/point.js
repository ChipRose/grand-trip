import { getRandPartArray, getRandItemArray, getRandomInteger } from '../util';

const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const destinations = [
  {
    title: 'Chamonix',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    pictures: [
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Chamonix parliament building"
      }
    ]
  },
  {
    title: 'Amsterdam',
    description: 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.',
    pictures: [
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Amsterdam some building"
      }
    ]
  },
  {
    title: 'Geneva',
    description: 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.',
    pictures: [
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Geneva some place"
      }
    ]
  },
]

const offers = [
  {
    id: '1',
    title: 'Upgrade to a business class',
    price: getRandomInteger(100, 500),
  },
  {
    id: '2',
    title: 'Add luggage',
    price: getRandomInteger(100, 500),
  },
  {
    id: '3',
    title: 'Switch to comfort class',
    price: getRandomInteger(100, 500),
  },
  {
    id: '4',
    title: 'Add meal',
    price: getRandomInteger(100, 500),
  },
  {
    id: '5',
    title: 'Choose seats',
    price: getRandomInteger(100, 500),
  },
  {
    id: '6',
    title: 'Travel by train',
    price: getRandomInteger(100, 500),
  },
];

const offersByType = types.map((type) => {
  const offersIdList = offers.map(({ id }) => id);
  return ({
    type,
    offers: getRandPartArray(offersIdList),
  })
});

const getItemsById = (array, itemId) => (
  itemId?.map((id) => array?.filter((item) => String(item.id) === String(id)))
)

const getOffersByType = (offerType) => (offersByType.find(({ type }) => type === offerType).offers);

export const generatePoint = () => {
  const type = getRandItemArray(types);
  const offers = getOffersByType(type);
  return ({
    id: '0',
    basePrice: getRandomInteger(200, 1000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: destinations[getRandomInteger(0, destinations.length - 1)],
    type,
    offers,
    isFavorite: false,
  })
}
