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

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const DateFormat = {
  DATE: 'MMM D',
  TIME: 'HH:mm',
  DATE_TIME: 'DD[/]MM[/]YY[&nbsp;]HH[:]mm',
  LONG_TIME: 'DD[D] HH[H] mm[M]',
  MIDDLE_TIME: 'HH[H] mm[M]',
  SHORT_TIME: 'mm[M]'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
}

export { NoPointMessage, FilterType, SortType, BLANK_POINT, DateFormat, Mode };
