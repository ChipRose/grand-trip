import BoardView from "../view/board-view";
import SortView from "../view/sort-view";
import ListView from "../view/list-view";
import NoPointsView from "../view/no-points-view";
import NewPointButtonView from "../view/new-point-button-view";
import InfoView from "../view/info-view";
import PointPresenter from "./point-presenter";
import { render, remove } from '../framework/render';
import { filtering } from "../util/filter-util";
import { sorting } from "../util/sorting-util";
import { SortType, UserAction, UpdateType, FilterType, RenderPosition } from "../mock/const";

export default class BoardPresenter {
  #boardContainer = null;
  #pointsControlContainer = null;

  #sortComponent = null;
  #noPointComponent = null;
  #infoComponent = null;
  #newPointButtonComponent = null;
  #boardComponent = new BoardView();
  #listComponent = new ListView();

  #pointsModel = null;
  #filterModel = [];
  #currentSortType = SortType.DEFALT;
  #currentFilterType = FilterType.DEFALT;
  #pointPresenter = new Map();

  constructor({ boardContainer, pointsControlContainer, pointsModel, filterModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsControlContainer = pointsControlContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#pointsModel.points;
    this.#currentFilterType = this.#filterModel.filter;
    const filteredPoints = filtering({ points, filterType: this.#currentFilterType });

    return sorting({ points: filteredPoints, sortType: this.#currentSortType }) || this.#pointsModel.points;
  }

  #renderControlPanel = () => {
    const prevNewButtonComponent = this.#newPointButtonComponent;

    this.#infoComponent = new InfoView(this.#pointsModel.points);
    render(this.#infoComponent, this.#pointsControlContainer, RenderPosition.AFTERBEGIN);

    if (prevNewButtonComponent === null) {
      this.#newPointButtonComponent = new NewPointButtonView();
      render(this.#newPointButtonComponent, this.#pointsControlContainer);
      return
    }
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

  #renderEmptyState = () => {
    this.#noPointComponent = new NoPointsView(this.#currentFilterType);

    render(this.#noPointComponent, this.#boardComponent.element);
  }

  #renderBoard = () => {
    const points = this.points;
    const pointsCount = points?.length;

    render(this.#boardComponent, this.#boardContainer);

    if (pointsCount === 0) {
      this.#renderEmptyState(this.#filterModel.filter);
      return;
    }

    this.#renderControlPanel();
    this.#renderSort();
    render(this.#listComponent, this.#boardComponent.element);
    this.#renderPoints(points);
  }

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());

    remove(this.#sortComponent);
    remove(this.#infoComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFALT;
    }

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
  }

  #handleModelEvent = (updateType, data) => {
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
