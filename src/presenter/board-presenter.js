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

  init = (boardContainer, pointsModel) => {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    render(this.#listComponent, this.#boardComponent.element);
    render(new EditPointView(this.#boardPoints[0]), this.#listComponent.element);

    for (let i = 1; i < this.#boardPoints.length; i++) {
      render(new PointView(this.#boardPoints[i]), this.#listComponent.element);
    }
  }
}
