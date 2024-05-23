import { nanoid } from "nanoid";
import { remove, render } from "../framework/render";
import EditPointView from "../view/edit-point-view";
import { UserAction, UpdateType, RenderPosition } from "../mock/const";

export default class PointNewPresenter {
  #listComponent = null;
  #pointEditComponent = null;

  #changeData = null;
  #destroyCallback = null;

  constructor({ listComponent, changeData }) {
    this.#listComponent = listComponent;
    this.#changeData = changeData;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'ESC') {
      this.destroy();
    }
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #handleFormSubmit = (point) => {
    this.#changeData({
      actionType: UserAction.ADD_POINT,
      updateType: UpdateType.MINOR,
      update: {
        id: nanoid(),
        ...point
      }
    });
    this.destroy();
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView();
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#listComponent, RenderPosition.AFTERBEGIN);
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();
    remove(this.#pointEditComponent);

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}
