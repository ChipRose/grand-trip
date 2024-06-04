import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';
import { capitalizeText } from '../util/common-util';
import { getUtcDate } from '../util/point-util';
import { humanizePointDateTime } from '../util/point-util';
import { BLANK_POINT, types } from '../util/const';
import { getDestination, getAvailableOffers } from '../util/point-util';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createEventTypeList = (pointState) => {
  const { type, types, isDisabled } = pointState;
  const isTypeChecked = (currentType) => (type === currentType ? 'checked' : '');

  return (`
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle" value=${type} type="checkbox"  ${isDisabled ? 'disabled' : ''}>
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${types?.map((typeItem, index) => (`
            <div class="event__type-item">
              <input id="event-type-${typeItem}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${typeItem} ${isTypeChecked(typeItem)}  ${isDisabled ? 'disabled' : ''}>
              <label class="event__type-label  event__type-label--${typeItem}" for="event-type-${typeItem}-${index}">${capitalizeText(typeItem)}</label>
            </div>
          `)).join('')}
        </fieldset>
      </div>
    </div>
  `)
}

const createEventDestinationList = (pointState) => {
  const { type, destinations, destination, isDisabled } = pointState;

  return (`
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination">
      ${capitalizeText(type)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination" type="text" name="event-destination" value="${destination?.name || ''}" list="destination-list-1"  ${isDisabled ? 'disabled' : ''}>
      <datalist id="destination-list-1">
        ${destinations?.map(({ name }) => (`
          <option value="${he.encode(name)}"></option>
        `)).join('')}
      </datalist>
    </div>
  `)
}

const createEventTimeBlock = (pointState) => {
  const { dateFrom, dateTo, isDisabled } = pointState;

  const timeStart = humanizePointDateTime(dateFrom);
  const timeEnd = humanizePointDateTime(dateTo);

  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time">From</label>
      <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value=${timeStart}  ${isDisabled ? 'disabled' : ''}>
      &mdash;
      <label class="visually-hidden" for="event-end-time">To</label>
      <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value=${timeEnd}  ${isDisabled ? 'disabled' : ''}>
    </div>
  `)
}

const createEventPriceBlock = (pointState) => {
  const { basePrice, isDisabled } = pointState;

  return (`
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price" type="text" name="event-price" value=${basePrice}  ${isDisabled ? 'disabled' : ''}>
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
  const { isSubmitDisabled, isSaving, isDeleting, isDisabled, isNew } = pointState;

  const getResetButtonState = ({ isNew, isDeleting }) => {
    if (isNew) {
      return 'Cancel';
    }

    return isDeleting ? 'Deleting...' : 'Delete';
  }

  return (`
    <header class="event__header">
      ${createEventTypeList(pointState)}
      ${createEventDestinationList(pointState)}
      ${createEventTimeBlock(pointState)}
      ${createEventPriceBlock(pointState)}
      <button class="event__save-btn  btn  btn--blue" ${isSubmitDisabled || isDisabled ? 'disabled' : ''} type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset">${getResetButtonState({ isDeleting, isNew })}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
      </header>
  `)
}

const createOffersBlock = (point) => {
  const { offers, offersAvailable, isDisabled } = point;
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
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${isDisabled ? 'blocked' : id}" type="checkbox" name="${isDisabled ? '' : id}" value="${isDisabled ? '' : id}" ${isOfferChecked({ currentId: id, offers })}  ${isDisabled ? 'disabled' : ''}>
          <label class="event__offer-label" for="event-offer-${isDisabled ? 'blocked' : id}">
            <span class="event__offer-title">${title}</span>
            ${price ? `
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            ` : ''}
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
  #generalInfo = null;
  #isNew = false;

  constructor({ point = BLANK_POINT, generalInfoModel, isNew }) {
    super();
    this.#isNew = isNew;
    this.#generalInfo = generalInfoModel.generalInfo;

    this._state = this.#parsePointToState(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  #parsePointToState = (point) => ({
    ...point,
    types,
    offersAvailable: getAvailableOffers({ offerType: point.type, offersByType: this.#generalInfo?.offersByType }),
    destinations: this.#generalInfo?.destinations,
    isSubmitDisabled: !point.destination || !point.dateFrom || !point.dateTo,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
    isNew: this.#isNew
  })

  #parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.offersAvailable;
    delete point.destinations;
    delete point.types;
    delete point.isSubmitDisabled;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    delete point.isNew;

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
    this.updateElement(this.#parsePointToState(point));
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
    this._callback.submitClick(this.#parseStateToPoint(this._state));
  }

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  }

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(this.#parseStateToPoint(this._state));
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const type = evt.target.value;

    this.updateElement({
      type,
      offersAvailable: getAvailableOffers({ offerType: type, offersByType: this.#generalInfo?.offersByType }),
      offers: []
    });
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = getDestination({ name: evt.target.value, destinations: this.#generalInfo.destinations })

    if (evt.target.value === '') {
      this.updateElement({
        destination: null,
        isSubmitDisabled: true
      })
      return;
    }

    if (!destination) {
      this.updateElement({
        destination: { title: evt.target.value, description: '', pictures: [] },
        isSubmitDisabled: false
      })
      return;
    }

    this.updateElement({
      ...destination,
      isSubmitDisabled: !this._state.dateFrom && !this._state.dateTo
    });
  }

  #dateChangeHandler = ([dateFrom, dateTo]) => {
    if (!dateFrom || !dateTo) {
      this.updateElement({
        isSubmitDisabled: true,
        dateFrom: null,
        dateTo: null
      })
      return
    }

    this.updateElement({
      dateFrom: getUtcDate(dateFrom),
      dateTo: getUtcDate(dateTo),
      isSubmitDisabled: !this._state.destination,
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
    if (isNaN(evt.key) && evt.code !== 'Backspace' && evt.code !== 'ArrowLeft' && evt.code !== 'ArrowRight') {
      evt.preventDefault();
    }
  }

  #basePriceChangeHandler = (evt) => {
    const price = Number(evt.target.value.trim().replace(/\s/g, ''));
    this._setState({
      basePrice: typeof price === 'number' ? price : 0,
    });
  }
}
