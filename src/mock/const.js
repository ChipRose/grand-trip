export const BLANK_POINT = {
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

export const NoPointMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no past events now',
  PAST: 'There are no future events now',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export const SortType = {
  DEFALT: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export const DateFormat = {
  DATE: 'MMM D',
  TIME: 'HH:mm',
  DATE_TIME: 'DD[/]MM[/]YY[&nbsp;]HH[:]mm',
  FULL_TIME: 'MM[MON] DD[D] HH[H] mm[M]',
  LONG_TIME: 'DD[D] HH[H] mm[M]',
  MIDDLE_TIME: 'HH[H] mm[M]',
  SHORT_TIME: 'mm[M]'
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};
