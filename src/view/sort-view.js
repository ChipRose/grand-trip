import AbstractView from '../framework/view/abstract-view';

const createSortingList = (sorting) => {
  return sorting.map(({ name: sortingName }) => (`
    <div class="trip-sort__item  trip-sort__item--${sortingName}">
      <input id="sort-${sortingName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortingName}">
      <label class="trip-sort__btn" for="sort-${sortingName}">${sortingName}</label>
    </div>
  `)).join('');
}

const createSortTemplate = (sorting) => {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortingList(sorting)}
    </form>
  `)
}

export default class SortView extends AbstractView {
  #sorting = [];

  constructor(sorting) {
    super();
    this.#sorting = sorting;
  }

  get template() {
    return createSortTemplate(this.#sorting);
  }
}
