import { createElement } from '../render.js';

const createBoardTemplate = () => {
  return (`
    <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
    </section>
  `)
}

export default class BoardView {
  #element = null;

  get template() {
    return createBoardTemplate();
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
