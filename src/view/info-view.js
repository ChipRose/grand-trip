import AbstractView from '../framework/view/abstract-view';
import { getOffersPrice, getDateInterval } from '../util/point-util';

const createInfoTemplate = (points) => {

  let totalPrice = 0;
  const route = [points[0].destination.name];

  points.forEach(({ destination, type, offers, basePrice }, index) => {
    if (index > 0 && route[index - 1] !== destination.name) {
      route.push(destination.name);
    }

    totalPrice += (basePrice || 0) + getOffersPrice({ type, offersSelected: offers }).offersPrice;
  })

  const totalRoute = route.join(" &mdash; ");

  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${totalRoute}</h1>

        <p class="trip-info__dates">${getDateInterval(points)}</p>
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
