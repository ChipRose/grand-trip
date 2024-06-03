import PointView from "../view/point-view";
import EditPointView from "../view/edit-point-view";
import { Mode, UpdateType, UserAction } from "../mock/const";
import { render, replace, remove } from "../framework/render";
import { getTotalPrice } from "../util/point-util";

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;

  #listContainer = null;

  #changeData = null;
  #changeMode = null;
  #point = null;
  #generalInfoModel = null;

  #mode = Mode.DEFAULT;

  constructor({ listContainer, changeData, changeMode, generalInfoModel }) {
    this.#listContainer = listContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#generalInfoModel = generalInfoModel;
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
    if (this.#generalInfoModel.isError()) {
      this.setAborting();
      return;
    }

    this.#replacePointToForm();
  }

  #handleCloseClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
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
    const destinationChangeFlag = this.#point?.destination?.name !== update?.destination?.name;
    const datesChangeFlag = this.#point?.dateFrom !== update?.dateFrom || this.#point?.dateTo !== update?.dateTo;
    const priceChangingFlag = getTotalPrice({ point: this.#point, offersByType: this.#generalInfoModel?.offers });
    const isMinorUpdate = destinationChangeFlag || datesChangeFlag || priceChangingFlag;

    this.#changeData({
      actionType: UserAction.UPDATE_POINT,
      updateType: isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    });
  }

  init = (point) => {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({ point, generalInfoModel: this.#generalInfoModel });
    this.#pointEditComponent = new EditPointView({ point, generalInfoModel: this.#generalInfoModel, isNew: false });

    this.#pointComponent.setOpenClickHandler(this.#handleOpenClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setCloseClickHandler(this.#handleCloseClick);
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
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode === Mode.DEFAULT;
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

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

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
