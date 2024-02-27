import { getRandPartArray, getRandItemArray, getRandomInteger, getRandomDate } from '../util/util';

const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const destinations = [
  {
    title: 'Chamonix',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    pictures: [
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Chamonix parliament building"
      },
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Chamonix parliament building"
      },
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Chamonix parliament building"
      },
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Chamonix parliament building"
      },
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Chamonix parliament building"
      },
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Chamonix parliament building"
      },
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Chamonix parliament building"
      },
    ]
  },
  {
    title: 'Amsterdam',
    description: 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.',
    pictures: [
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Amsterdam some building"
      },
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Amsterdam some building"
      },
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Amsterdam some building"
      },
      {
        src: `https://loremflickr.com/320/240?lock=${getRandomInteger(1000, 10000)}`,
        description: "Amsterdam some building"
      },
    ]
  },
  {
    title: 'Geneva',
    description: 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.',
    pictures: [

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
  return ({
    type,
    offers: getRandPartArray(offers),
  })
});

const getItemsById = ({ array = offers, itemId }) => (
  itemId?.map((id) => array?.find((item) => String(item.id) === String(id)))
)

const getOffersByType = (offerType) => (offersByType.find(({ type }) => type === offerType).offers);

const type = getRandItemArray(types);
const offersAvailable = getOffersByType(type);
const offersSelected = getRandPartArray(offersAvailable);

export const getPointGeneralInfo = (type) => {
  return ({
    types,
    destinations,
    offersAvailable: getOffersByType(type),
  })
 }

export const generatePoint = () => {
  const date = getRandomDate();

  return ({
    id: '0',
    basePrice: getRandomInteger(200, 1000),
    dateFrom: date.dateFrom,
    dateTo: date.dateTo,
    destination: destinations[getRandomInteger(0, destinations.length - 1)],
    type,
    offers: offersSelected,
    isFavorite: Boolean(getRandomInteger()),
  })
}
