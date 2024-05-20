import PointView from "../view/point-view";
import EditPointView from "../view/edit-point-view";
import { isPastEvent, isFutureEvent } from "../util/point-util";
import { Mode, UpdateType, UserAction } from "../mock/const";
import { render, replace, remove } from "../framework/render";

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #listContainer = null;
  #changeData = null;
  #changeMode = null;
  #point = null;
  #mode = Mode.DEFAULT;

  constructor({ listContainer, changeData, changeMode }) {
    this.#listContainer = listContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);

    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'ESC') {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #handleOpenClick = () => {
    this.#replacePointToForm();
  }

  #handleDeleteClick = (point) => {
    this.#changeData({
      actionType: UserAction.DELETE_POINT,
      updateType: UpdateType.MINOR,
      update: point
    });
  }

  #handleFavoriteClick = () => {
    this.#changeData({
      actionType: UserAction.UPDATE_POINT,
      updateType: UpdateType.MINOR,
      update: {
        ...this.#point, isFavorite: !this.#point.isFavorite
      }
    });
  }

  #handleFormSubmit = (update) => {
    const isMinorUpdate = isPastEvent(this.#point.dateFrom) || isFutureEvent(this.#point.dateFrom);

    this.#changeData({
      actionType: UserAction.UPDATE_POINT,
      updateType: isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    });

    this.#replaceFormToPoint();
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new EditPointView(point);

    this.#pointComponent.setOpenClickHandler(this.#handleOpenClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }
}
