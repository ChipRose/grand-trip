import AbstractView from "../framework/view/abstract-view";

const createNewPointTemplate = () => {
  return (`
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `);
}
export default class NewPointButtonView extends AbstractView {
  get template() {
    return createNewPointTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click',this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
}
