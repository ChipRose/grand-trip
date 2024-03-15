import BoardView from "../view/board-view";
import SortView from "../view/sort-view";
import ListView from "../view/list-view";
import PointView from "../view/point-view";
import EditPointView from "../view/edit-point-view";
import { render } from '../render';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];

  #boardComponent = new BoardView();
  #listComponent = new ListView();

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditPointView(point);

    const replacePointToForm = () => {
      this.#listComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#listComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'ESC') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    }

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

    render(pointComponent, this.#listComponent.element);
  }

  init = (boardContainer, pointsModel) => {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    render(this.#listComponent, this.#boardComponent.element);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }
}
