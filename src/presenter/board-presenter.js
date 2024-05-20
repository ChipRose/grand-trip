import BoardView from "../view/board-view";
import SortView from "../view/sort-view";
import ListView from "../view/list-view";
import NoPointsView from "../view/no-points-view";
import ControlEventsView from "../view/control-events-view";
import NewPointButtonView from "../view/new-point-button-view";
import InfoView from "../view/info-view";
import PointPresenter from "./point-presenter";
import { render, remove } from '../framework/render';
import { generateFilter } from "../mock/filter";
import { sortDateDown, sortPriceDown, sortTimeDown } from "../util/sorting-util";
import { SortType, UserAction, UpdateType } from "../mock/const";

export default class BoardPresenter {
  #boardContainer = null;
  #pointsControlContainer = null;

  #sortComponent = null;
  #noPointComponent = null;
  #infoComponent = null;
  #newPointButtonComponent = null;
  #controlEventsComponent = null;
  #boardComponent = new BoardView();
  #listComponent = new ListView();

  #pointsModel = null;
  #filters = [];
  #currentSortType = SortType.DEFALT;
  #pointPresenter = new Map();


  constructor({ boardContainer, pointsControlContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsControlContainer = pointsControlContainer;
    this.#pointsModel = pointsModel;
    this.#filters = generateFilter(this.#pointsModel.points);

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DEFALT:
        return [...this.#pointsModel.points].sort(sortDateDown);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPriceDown);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortTimeDown);
    }

    return this.#pointsModel.points;
  }

  #renderPointsControlPanel = (points) => {
    this.#infoComponent = new InfoView(points);
    this.#controlEventsComponent = new ControlEventsView(this.#filters);
    this.#newPointButtonComponent = new NewPointButtonView();

    const handleNewPointButtonClick = () => {
      console.log('New');
    }

    this.#newPointButtonComponent.setClickHandler(handleNewPointButtonClick)

    render(this.#infoComponent, this.#pointsControlContainer);
    render(this.#controlEventsComponent, this.#pointsControlContainer);
    render(this.#newPointButtonComponent, this.#pointsControlContainer);
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardComponent.element);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({ listContainer: this.#listComponent.element, changeData: this.#handleViewAction, changeMode: this.#handleModeChange });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    points.forEach((point) => {
      this.#renderPoint(point);
    })
  }

  #renderEmptyState = (filterType) => {
    this.#noPointComponent = new NoPointsView(filterType);

    render(this.#noPointComponent, this.#boardComponent.element);
  }

  #renderBoard = () => {
    const points = this.points;
    const pointsCount = points?.length;

    render(this.#boardComponent, this.#boardContainer);

    if (pointsCount === 0) {
      this.#renderEmptyState();
      return;
    }

    this.#renderPointsControlPanel(points);
    this.#renderSort();
    render(this.#listComponent, this.#boardComponent.element);
    this.#renderPoints(points);
  }

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());

    remove(this.#sortComponent);
    remove(this.#noPointComponent);
    remove(this.#infoComponent);
    remove(this.#controlEventsComponent);
    remove(this.#newPointButtonComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFALT;
    }
  }

  #handleModelEvent = (updateType, data ) => {
    console.log({ updateType, data });
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  }

  #handleViewAction = ({ actionType, updateType, update }) => {
    console.log({ actionType, updateType, update });
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint({ updateType, update });
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint({ updateType, update });
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint({ updateType, update });
        break;
    }
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }

  init = () => {
    this.#renderBoard();
  }
}
