import AbstractView from '../framework/view/abstract-view';
import { getTotalPrice, getDateInterval } from '../util/point-util';

const createInfoTemplate = ({ points, offersByType }) => {
  let totalPrice = 0;
  let route = [];

  route.push(points[0].destination.name);

  points.forEach((point, index, points) => {
    if (index > 0) {
      const prevDest = points[index - 1].destination.name;
      const currDest = points[index].destination.name;
      if (prevDest !== currDest) {
        route.push(currDest)
      }
    }

    totalPrice += getTotalPrice({ point, offersByType });
  })

  const fullRoute = route.length > 3 ? [route[0], '...', route[route.length - 1]] : route;
  const totalRoute = fullRoute.join(" &mdash; ");

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
    return createInfoTemplate({ points: this.#points, offersByType: this.#generalInfo?.offersByType });
  }
}
