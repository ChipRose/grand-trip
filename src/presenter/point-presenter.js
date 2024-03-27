import PointView from "../view/point-view";
import EditPointView from "../view/edit-point-view";
import { getPointGeneralInfo } from "../mock/point";
import { render, replace, remove } from "../framework/render";

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #listContainer = null;
  #point = null;

  constructor(listContainer) {
    this.#listContainer = listContainer;
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#EscKeyDownHandler);
  }

  #EscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'ESC') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  }

  #handleOpenClick = () => {
    this.#replacePointToForm();
  }

  #handleFormSubmit = () => {
    this.#replacePointToForm();
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new EditPointView({ point, getPointGeneralInfo });

    this.#pointComponent.setOpenClickHandler(this.#handleOpenClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listContainer);
      return;
    }

    if (this.#listContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent)
    }

    if (this.#listContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent)
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }
}
