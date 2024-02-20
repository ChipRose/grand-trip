import BoardView from "../view/board-view";
import SortView from "../view/sort-view";
import ListView from "../view/list-view";
import PointView from "../view/point-view";
import EditPointView from "../view/edit-point-view";
import { render } from '../render';

export default class BoardPresenter {
  boardComponent = new BoardView();
  listComponent = new ListView();

  init = (boardContainer, pointsModel) => {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = [...pointsModel.getPoints()];

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.listComponent, this.boardComponent.getElement());
    render(new EditPointView(), this.listComponent.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointView(this.boardPoints[i]), this.listComponent.getElement());
    }
  }
}
