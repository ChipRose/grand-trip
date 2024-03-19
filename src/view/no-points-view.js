import { createElement } from '../render';
import { getNoPointMessage } from '../util/const';

const createNoPointTemplate = (filterType) => {
  return (`
  <p class="trip-events__msg">
    ${getNoPointMessage(filterType)}
  </p>
  `)
}

export default class NoPointsView {
  #element = null;
  #filterType = ''

  constructor(filterType) {
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

