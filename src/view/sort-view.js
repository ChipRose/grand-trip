import { SortType } from '../mock/const';
import AbstractView from '../framework/view/abstract-view';

const createSortTemplate = (currentSortType) => {
  const sortingType = Object.values(SortType);
  const isChecked=(sortingName)=>{
    return sortingName===currentSortType?'checked':''
  }

  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingType.map((sortingName) => (`
        <div class="trip-sort__item  trip-sort__item--${sortingName}">
          <input id="sort-${sortingName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" ${isChecked(sortingName)} value="${sortingName}">
          <label class="trip-sort__btn" for="sort-${sortingName}">${sortingName}</label>
        </div>
      `)).join('')}
    </form>
  `)
}

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click',this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#currentSortType = evt.target.value;
    this._callback.sortTypeChange(evt.target.value);
    console.log(this.#currentSortType);
  }
}
