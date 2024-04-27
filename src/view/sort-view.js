import { SortType } from '../mock/const';
import AbstractView from '../framework/view/abstract-view';

const createSortingList = () => {
  const sortingType = Object.values(SortType);

  return sortingType.map((sortingName) => (`
    <div class="trip-sort__item  trip-sort__item--${sortingName}">
      <input id="sort-${sortingName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortingName}">
      <label class="trip-sort__btn" for="sort-${sortingName}">${sortingName}</label>
    </div>
  `)).join('');
}

const createSortTemplate = () => {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortingList()}
    </form>
  `)
}

export default class SortView extends AbstractView {

  constructor() {
    super();
  }

  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click',this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.value !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.value);
  }
}
