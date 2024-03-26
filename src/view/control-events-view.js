import AbstractView from '../framework/view/abstract-view';

const createFiltersList = (filters) => {
  const isItemDisabled = (count) => (
    !count ? 'disabled' : ''
  )

  return (`
    ${filters.map(({ name: filterName, count }) => (`
      <div class="trip-filters__filter">
        <input
          class="trip-filters__filter-input  visually-hidden"
          id="filter-${filterName}"
          type="radio"
          name="trip-filter"
          value=${filterName}
          ${isItemDisabled(count)}>
        <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
        </div>
    `)).join('')}
  `)
}

const createFilterTemplate = (filters) => {
  return (`
    <div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${createFiltersList(filters)}
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>
  `)
}

export default class ControlEventsView extends AbstractView {
  #filters = [];

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
