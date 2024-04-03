import BoardView from "../view/board-view";
import SortView from "../view/sort-view";
import ListView from "../view/list-view";
import NoPointsView from "../view/no-points-view";
import ControlEventsView from "../view/control-events-view";
import NewPointButtonView from "../view/new-point-button-view";
import PointPresenter from "./point-presenter";
import { render } from '../framework/render';
import { generateFilter } from "../mock/filter";
import { generateSorting } from "../mock/sorting";
import { updateItem } from "../util/common-util";

export default class BoardPresenter {
  #boardContainer = null;
  #pointsControlContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #filters = [];
  #sorting = [];
  #pointPresenter = new Map();

  #boardComponent = new BoardView();
  #listComponent = new ListView();

  constructor({ boardContainer, pointsControlContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsControlContainer = pointsControlContainer;
    this.#pointsModel = pointsModel;
    this.#filters = generateFilter(this.#pointsModel.points);
    this.#sorting = generateSorting(this.#pointsModel.points);
    console.log('pointsModel', this.#pointsModel.points);
  }

  #renderPointsControlPanel = () => {
    const controlEventsComponent = new ControlEventsView(this.#filters);
    const newPointButtonComponent = new NewPointButtonView();

    const handleNewPointButtonClick = () => {
      console.log('New');
    }

    newPointButtonComponent.setClickHandler(handleNewPointButtonClick)

    render(controlEventsComponent, this.#pointsControlContainer);
    render(newPointButtonComponent, this.#pointsControlContainer);
  }

  #renderSortComponent = () => {
    const sortComponent = new SortView(this.#sorting);

    render(sortComponent, this.#boardComponent.element);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({ listContainer: this.#listComponent.element, changeData: this.#handlePointChange, changeMode: this.#handleModeChange });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#boardPoints.forEach((point) => {
      this.#renderPoint(point);
    })
  }

  #renderEmptyState = (filterType) => {
    const noPointComponent = new NoPointsView(filterType);

    render(noPointComponent, this.#boardComponent.element);
  }

  #renderPointsList = () => {
    render(this.#listComponent, this.#boardComponent.element);
    this.#renderPoints();
  }

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#boardPoints?.length) {
      this.#renderEmptyState();
      return;
    }

    this.#renderSortComponent();
    this.#renderPointsList();
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem({ items: this.#boardPoints, update: updatedPoint });
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderPointsControlPanel();
    this.#renderBoard();
  }
}
