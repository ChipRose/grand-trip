import { getPointGeneralInfo } from '../mock/point';
import { capitalizeText } from '../util/util';
import { humanizePointDateTime } from '../util/point-util';
import AbstractView from '../framework/view/abstract-view';

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

const createEventBlock = (point, types, destinations) => {
  const { type, dateFrom, dateTo, destination } = point || {};
  const { title } = destination;

  const timeStart = humanizePointDateTime(dateFrom);
  const timeEnd = humanizePointDateTime(dateTo);

  const isItemChecked = (item) => (
    item === type ? 'checked' : ''
  )

  const createEventTypeList = () => {
    return (`
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${types?.map((item, index) => (`
            <div class="event__type-item">
              <input id="event-type-${item}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${item} ${isItemChecked(item)}>
              <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-${index}">${capitalizeText(item)}</label>
            </div>
          `)).join('')}
        </fieldset>
      </div>
    `)
  }

  const createEventDestinationList = () => {
    return (`
      <datalist id="destination-list-1">
        ${destinations.map(({ title }) => (`
          <option value=${title}></option>
        `)).join('')}
      </datalist>
    `)
  }

  return (`
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        ${createEventTypeList()}
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${capitalizeText(type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${title}" list="destination-list-1">
        ${createEventDestinationList()}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${timeStart}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${timeEnd}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
  `)
}

const createOffersBlock = ({ offers, offersAvailable }) => {

  const isOfferChecked = (offerId) => (
    offers?.find(({ id }) => id === offerId) ? 'checked' : ''
  )

  return (offersAvailable?.length ? `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersAvailable.map(({ title, price, id }) => (`
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${isOfferChecked(id)}>
            <label class="event__offer-label" for="event-offer-${id}">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>
        `)).join('')}
      </div>
    </section>
  `: '')
}

const createDestinationBlock = (destination) => {
  const { pictures, description } = destination || {};

  const createGalleryBlockTemplate = (pictures) => (
    pictures?.length ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map(({ src, alt }) => (`
            <img class="event__photo" src=${src} alt=${alt}>
          `)).join('')}
        </div>
      </div>
    ` : ''
  )

  return (
    description ? `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">
          ${description}
        </p>

        ${createGalleryBlockTemplate(pictures)}
      </section>
    `: ''
  )
}

const createEditPointTemplate = (point = {}) => {
  const {
    dateFrom,
    dateTo,
    destination = {
    },
    type,
    offers,
  } = point;
  const { types, offersAvailable, destinations } = getPointGeneralInfo(point?.type);

  return (`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        ${createEventBlock({ dateFrom, dateTo, type, destination }, types, destinations)}
        <section class="event__details">
        ${createOffersBlock({ offers, offersAvailable })}
        ${createDestinationBlock(destination)}
        </section>
      </form>
    </li>
  `)
}

export default class EditPointView extends AbstractView {
  #point = null;

  constructor(point = BLANK_POINT) {
    super();
    this.#point = point;
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.submitClick = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitClick();
  }
}
