import BoardView from "../view/board-view";
import SortView from "../view/sort-view";
import ListView from "../view/list-view";
import PointView from "../view/point-view";
import EditPointView from "../view/edit-point-view";
import NoPointsView from "../view/no-points-view";
import ControlEventsView from "../view/control-events-view";
import NewPointButtonView from "../view/new-point-button-view";
import { getPointGeneralInfo } from "../mock/point";
import { render, replace } from '../framework/render';
import { generateFilter } from "../mock/filter";
import {generateSorting} from "../mock/sorting";

export default class BoardPresenter {
  #boardContainer = null;
  #pointsControlContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #filters=[];
  #sorting=[];

  #boardComponent = new BoardView();
  #listComponent = new ListView();

  constructor({ boardContainer, pointsControlContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsControlContainer = pointsControlContainer;
    this.#pointsModel = pointsModel;
    this.#filters = generateFilter(this.#pointsModel.points);
    this.#sorting = generateSorting(this.#pointsModel.points);
    console.log(this.#filters);
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

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditPointView({ point, getPointGeneralInfo });

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'ESC') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    }

    pointComponent.setOpenClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
    });

    render(pointComponent, this.#listComponent.element);
  }

  #renderEmptyState = (filterType) => {
    render(new NoPointsView(filterType), this.#boardComponent.element)
  }

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#boardPoints?.length) {
      this.#renderEmptyState();
      return;
    }

    render(new SortView(this.#sorting), this.#boardComponent.element);
    render(this.#listComponent, this.#boardComponent.element);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderPointsControlPanel();
    this.#renderBoard();
  }
}
