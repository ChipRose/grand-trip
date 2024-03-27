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

export default class BoardPresenter {
  #boardContainer = null;
  #pointsControlContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #filters = [];
  #sorting = [];

  #boardComponent = new BoardView();
  #listComponent = new ListView();

  constructor({ boardContainer, pointsControlContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsControlContainer = pointsControlContainer;
    this.#pointsModel = pointsModel;
    this.#filters = generateFilter(this.#pointsModel.points);
    this.#sorting = generateSorting(this.#pointsModel.points);
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
    const pointPresenter = new PointPresenter(this.#listComponent.element);
    pointPresenter.init(point);
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

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderPointsControlPanel();
    this.#renderBoard();
  }
}
