import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';
import { capitalizeText } from '../util/common-util';
import { getUtcDate } from '../util/point-util';
import { humanizePointDateTime } from '../util/point-util';
import { BLANK_POINT } from '../mock/const';
import { getPointGeneralInfo, getDestination } from "../mock/point";
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createEventTypeList = (pointState) => {
  const { type, types } = pointState;
  const isTypeChecked = (currentType) => (type === currentType ? 'checked' : '');

  return (`
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle" value=${type} type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${types?.map((typeItem, index) => (`
            <div class="event__type-item">
              <input id="event-type-${typeItem}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${typeItem} ${isTypeChecked(typeItem)}>
              <label class="event__type-label  event__type-label--${typeItem}" for="event-type-${typeItem}-${index}">${capitalizeText(typeItem)}</label>
            </div>
          `)).join('')}
        </fieldset>
      </div>
    </div>
  `)
}

const createEventDestinationList = (pointState) => {
  const { type, destinations, destination } = pointState;

  return (`
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination">
      ${capitalizeText(type)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination" type="text" name="event-destination" value="${destination?.name || ''}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${destinations?.map(({ name }) => (`
          <option value="${he.encode(name)}"></option>
        `)).join('')}
      </datalist>
    </div>
  `)
}

const createEventTimeBlock = (pointState) => {
  const { dateFrom, dateTo } = pointState;

  const timeStart = humanizePointDateTime(dateFrom);
  const timeEnd = humanizePointDateTime(dateTo);

  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time">From</label>
      <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value=${timeStart}>
      &mdash;
      <label class="visually-hidden" for="event-end-time">To</label>
      <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value=${timeEnd}>
    </div>
  `)
}

const createEventPriceBlock = (pointState) => {
  const { basePrice } = pointState;
  return (`
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price" type="text" name="event-price" value=${basePrice}>
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
        ${pictures.map(({ src, description }) => (`
          <img class="event__photo" src=${src} alt=${description}>
        `)).join('')}
      </div>
    </div>
  `)
}

const createEventBlock = (pointState) => {
  const { isSubmitDisabled } = pointState;

  return (`
    <header class="event__header">
      ${createEventTypeList(pointState)}
      ${createEventDestinationList(pointState)}
      ${createEventTimeBlock(pointState)}
      ${createEventPriceBlock(pointState)}
      <button class="event__save-btn  btn  btn--blue" ${isSubmitDisabled} type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
      </header>
  `)
}

const createOffersBlock = (point) => {
  const { offers, offersAvailable } = point;
  const isOfferChecked = ({ currentId, offers }) => (offers.includes(Number(currentId)) ? 'checked' : '');

  if (!offersAvailable?.length) {
    return ('');
  }

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersAvailable.map(({ id, title, price }) => (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" value="${id}" ${isOfferChecked({ currentId: id, offers })}>
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

  if (!description) {
    return ''
  }

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
  #datepicker = null;

  constructor(point = BLANK_POINT) {
    super();
    this._state = EditPointView.parsePointToState(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  static parsePointToState = (point) => ({
    ...point,
    ...getPointGeneralInfo(point.type),
    isSubmitDisabled: !point.destination || !point.dateFrom || !point.dateTo ? 'disabled' : '',
  })

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.offersAvailable;
    delete point.destinations;
    delete point.types;
    delete point.isSubmitDisabled;

    return point;
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset = (point) => {
    this.updateElement(EditPointView.parsePointToState(point));
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.submitClick = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.submitClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setCloseClickHandler(this._callback.closeClick);
  }

  #setDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time'), {
      enableTime: true,
      time_24hr: true,
      dateFormat: "d/m/y H:i",
      onClose: this.#dateChangeHandler,
      plugins: [
        new rangePlugin({
          input: this.element.querySelector('#event-end-time'),
        })
      ],
    }
    )
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__field-group--price')?.addEventListener('keydown', this.#basePriceInputNotNumberHandler);
    this.element.querySelector('.event__field-group--price')?.addEventListener('change', this.#basePriceChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__field-group--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.#setDatepicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitClick(EditPointView.parseStateToPoint(this._state));
  }

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  }

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditPointView.parseStateToPoint(this._state));
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      ...getPointGeneralInfo(evt.target.value),
      offers: []
    });
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.value === '') {
      this.updateElement({
        destination: null,
        isSubmitDisabled: 'disabled'
      })
      return
    }

    this.updateElement({
      ...getDestination(evt.target.value),
      isSubmitDisabled: this._state.dateFrom && this._state.dateTo ? '' : 'disabled'
    });
  }

  #dateChangeHandler = ([dateFrom, dateTo]) => {
    if (!dateFrom || !dateTo) {
      this.updateElement({
        isSubmitDisabled: 'disabled',
        dateFrom: null,
        dateTo: null
      })
      return
    }

    this.updateElement({
      dateFrom: getUtcDate(dateFrom),
      dateTo: getUtcDate(dateTo),
      isSubmitDisabled: this._state.destination ? '' : 'disabled',
    })
  }

  #offersChangeHandler = (evt) => {
    evt.preventDefault();

    const offerId = Number(evt.target.value);
    const offersTemp = [...this._state.offers];
    const offersRezult = offersTemp?.includes(offerId) ? offersTemp.filter((offer) => offer !== offerId) : [...offersTemp, offerId];

    this.updateElement({
      offers: offersRezult,
    });
  }

  #basePriceInputNotNumberHandler = (evt) => {
    if (isNaN(evt.key) && evt.key !== 'Backspace') {
      evt.preventDefault();
    }
  }

  #basePriceChangeHandler = (evt) => {
    this.updateElement({
      basePrice: Number(evt.target.value),
    });
  }
}
