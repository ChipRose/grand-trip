import AbstractView from '../framework/view/abstract-view';
import { getOffersPrice } from '../util/point-util';

const createInfoTemplate = (points) => {

  let totalPrice = 0;

  points.forEach(({ type, offers, basePrice }) => {
    totalPrice += (basePrice || 0) + getOffersPrice({ type, offersSelected: offers }).offersPrice;
  })
  console.log(points);
  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>
  `)
}

export default class InfoView extends AbstractView {
  #points = [];

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createInfoTemplate(this.#points);
  }
}
