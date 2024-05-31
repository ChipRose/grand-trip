import AbstractView from '../framework/view/abstract-view';
import { getTotalPrice, getDateInterval } from '../util/point-util';

const createInfoTemplate = ({points, offersByType}) => {
  let totalPrice = 0;
  const route = [points[0].destination.name];

  points.forEach((point, index) => {
    const { destination } = point;

    if (index > 0 && route[index - 1] !== destination.name) {
      route.push(destination.name);
    }

    totalPrice += getTotalPrice({ point, offersByType });
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
  #generalInfo = null;

  constructor({ points, generalInfo }) {
    super();
    this.#points = points;
    this.#generalInfo = generalInfo;
  }

  get template() {
    return createInfoTemplate({points: this.#points, offersByType: this.#generalInfo?.offersByType});
  }
}
