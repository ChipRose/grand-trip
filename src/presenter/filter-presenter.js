import { render, remove, replace } from '../framework/render';
import { filter } from '../util/filter-util';
import { UpdateType, FilterType } from "../util/const";
import FilterView from "../view/filter-view";

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filterModel = null;
  #pointsModel = null;

  constructor({ filterContainer, filterModel, pointsModel }) {

    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return ([
      {
        type: 'everything',
        name: 'EVERYTHING',
        count: filter[FilterType.EVERYTHING](points)?.length || 0,
      },
      {
        type: 'future',
        name: 'FUTURE',
        count: filter[FilterType.FUTURE](points)?.length || 0,
      },
      {
        type: 'past',
        name: 'PAST',
        count: filter[FilterType.PAST](points)?.length || 0,
      }
    ]);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter({
      updateType: UpdateType.MAJOR,
      filter: filterType
    })
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({ filters, currentFilter: this.#filterModel.filter })

    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }
}
