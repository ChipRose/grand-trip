import { capitalizeText, isItemChecked } from '../util/common-util';
import { humanizePointDateTime } from '../util/point-util';
import { BLANK_POINT } from '../mock/const';
import { getPointGeneralInfo } from "../mock/point";
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createEventTypeList = (point) => {
  const { id, type, types } = point;

  return (`
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" value=${type} type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${types?.map((item, index) => (`
            <div class="event__type-item">
              <input id="event-type-${item}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${item} ${isItemChecked({ array: [item], curValue: type })}>
              <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-${index}">${capitalizeText(item)}</label>
            </div>
          `)).join('')}
        </fieldset>
      </div>
    </div>
  `)
}

const createEventDestinationList = (point) => {
  const { id, type, destinations, destination } = point;
  return (`
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${id}">
      ${capitalizeText(type)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.title}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${destinations?.map(({ title }) => (`
          <option value=${title}></option>
        `)).join('')}
      </datalist>
    </div>
  `)
}

const createEventTimeBlock = (point) => {
  const { id, dateFrom, dateTo } = point;

  const timeStart = humanizePointDateTime(dateFrom);
  const timeEnd = humanizePointDateTime(dateTo);

  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${timeStart}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value=${timeEnd}>
    </div>
  `)
}

const createEventPriceBlock = (point) => {
  const { id } = point;
  return (`
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="">
    </div>
  `)
}

const createGalleryList = (pictures) => {
  if (!pictures?.length) {
    return ''
  }
  return (`
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map(({ src, alt }) => (`
          <img class="event__photo" src=${src} alt=${alt}>
        `)).join('')}
      </div>
    </div>
  `)
}

const createEventBlock = (point) => {

  return (`
    <header class="event__header">
      ${createEventTypeList(point)}
      ${createEventDestinationList(point)}
      ${createEventTimeBlock(point)}
      ${createEventPriceBlock(point)}

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
  `)
}

const createOffersBlock = (point) => {
  const { offers, offersAvailable } = point;

  if (!offersAvailable?.length) {
    return ('');
  }

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersAvailable.map(({ id, title, price }) => (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" value="${id}" ${isItemChecked({ array: offers, curValue: [id] })}>
          <label class="event__offer-label" for="event-offer-${id}">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>
      `)).join('')}
      </div>
    </section>
  `)
}

const createDestinationBlock = (point) => {
  const { pictures, description } = point.destination || {};

  if (description) {
    return (`
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">
          ${description}
        </p>
        ${createGalleryList(pictures)}
      </section>
    `)
  }
}

const createEditPointTemplate = (point = {}) => {

  return (`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        ${createEventBlock(point)}
        <section class="event__details">
          ${createOffersBlock(point)}
          ${createDestinationBlock(point)}
        </section>
      </form>
    </li>
  `)
}

export default class EditPointView extends AbstractStatefulView {

  constructor({ point = BLANK_POINT }) {
    super();
    this._state = EditPointView.parsePointToState(point);
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  static parsePointToState = (point) => ({
    ...point,
    ...getPointGeneralInfo(point.type)
  })

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.offersAvailable;
    delete point.destinations;
    delete point.types;
    console.log({ point });

    return point;
  }

  setFormSubmitHandler = (callback) => {
    this._callback.submitClick = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setTypeChangeHandler = (callback) => {
    this._callback.typeChange = callback;
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
  }

  setOffersChangeHandler = (callback) => {
    this._callback.offersChange = callback;
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler)
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitClick(EditPointView.parseStateToPoint(this._state));
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.typeChange(evt.target.value);
  }

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.offersChange(evt.target.value);
  }
}
