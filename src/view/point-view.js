import he from 'he';
import AbstractView from '../framework/view/abstract-view';
import { humanizePointDate, humanizePointTime, formatDurationTime, getAvailableOffers } from '../util/point-util';

const createOffersListBlock = (pointState) => {
  const { offersAvailable, offers, isError } = pointState;
  const checkedOffers = isError ? offersAvailable : offersAvailable?.filter((offer) => offers.includes(offer.id));

  if (!offers?.length) {
    return ('')
  }

  return (`
    <ul class="event__selected-offers">
      ${checkedOffers?.map(({ title, price }) => (
    `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        ${price ? `
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        ` : ''}
      </li>`
  )).join('')}
    </ul>
  `)
}

const createPointTemplate = (pointState) => {
  const { basePrice, dateFrom, dateTo, type = 'taxi', destination = {}, isFavorite, isDisabled } = pointState;
  const { name = '' } = destination;

  const pointTitle = he.encode(`${type} ${name}`);
  const pointBasePrice = he.encode(`${basePrice}`);
  const timeStart = humanizePointTime(dateFrom);
  const timeEnd = humanizePointTime(dateTo);
  const durationTime = formatDurationTime({ dateFrom, dateTo });
  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${dateFrom}>${humanizePointDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${pointTitle}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${dateFrom}>${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime=${dateTo}>${timeEnd}</time>
          </p>
          <p class="event__duration">${durationTime}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${pointBasePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${createOffersListBlock(pointState)}
        <button class="event__favorite-btn ${favoriteClass}" type="button" ${isDisabled ? 'disabled' : ''}>
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `)
}

export default class PointView extends AbstractView {
  #point = null;
  #generalInfoModel = null;
  #generalInfo = null;

  constructor({ point, generalInfoModel }) {
    super();

    this.#point = point;
    this.#generalInfoModel = generalInfoModel;
    this.#generalInfo = generalInfoModel.generalInfo;
  }

  get template() {
    return createPointTemplate({ ...this.#point, offersAvailable: getAvailableOffers({ offerType: this.#point.type, offersByType: this.#generalInfo?.offersByType }), isError: this.#generalInfoModel.isError() });
  }

  setOpenClickHandler = (callback) => {
    this._callback.openClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#openClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler)
  }

  #openClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
