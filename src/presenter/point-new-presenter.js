import { remove, render } from "../framework/render";
import EditPointView from "../view/edit-point-view";
import { UserAction, UpdateType, RenderPosition } from "../mock/const";

export default class PointNewPresenter {
  #listComponent = null;
  #pointEditComponent = null;

  #changeData = null;
  #destroyCallback = null;
  #generalInfo = null;

  constructor({ listComponent, changeData, generalInfo }) {
    this.#listComponent = listComponent;
    this.#changeData = changeData;
    this.#generalInfo = generalInfo;
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
      update: point
    });
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView({ generalInfo: this.#generalInfo });
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointEditComponent.setCloseClickHandler(this.#handleDeleteClick);
    document.addEventListener('keydown', this.#escKeyDownHandler);

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

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true
    })
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };
}
