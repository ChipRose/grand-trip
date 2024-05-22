import AbstractView from '../framework/view/abstract-view';

const createFiltersList = ({ filters, currentFilter = 'everything' }) => {
  return (`
    ${filters.map(({ type }) => (`
      <div class="trip-filters__filter">
        <input
          class="trip-filters__filter-input  visually-hidden"
          id="filter-${type}"
          type="radio"
          name="trip-filter"
          value=${type}
          ${type === currentFilter ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
        </div>
    `)).join('')}
  `)
}

const createFilterTemplate = ({ filters, currentFilter }) => {
  return (`
    <form class="trip-filters" action="#" method="get">
      ${createFiltersList({ filters, currentFilter })}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `)
}

export default class FilterView extends AbstractView {
  #filters = [];
  #currentFilter = [];

  constructor({ filters, currentFilter }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTemplate({ filters: this.#filters, currentFilter: this.#currentFilter });
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this._callback.filterTypeChange(evt.target.value);
  }
}
