import { getNoPointMessage } from '../util/const';
import AbstractView from '../framework/view/abstract-view';


const createNoPointTemplate = (filterType) => {
  return (`
  <p class="trip-events__msg">
    ${getNoPointMessage(filterType)}
  </p>
  `)
}

export default class NoPointsView extends AbstractView {
  #filterType = '';

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}

