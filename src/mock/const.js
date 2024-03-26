const BLANK_POINT = {
  id: '0',
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {
    title: '',
    description: '',
    pictures: []
  },
  type: 'taxi',
  offers: [],
  isFavorite: false
}

const NoPointMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no past events now',
  PAST: 'There are no future events now',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export { NoPointMessage, FilterType, BLANK_POINT };
