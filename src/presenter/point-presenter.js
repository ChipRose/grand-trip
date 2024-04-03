import PointView from "../view/point-view";
import EditPointView from "../view/edit-point-view";
import { getPointGeneralInfo } from "../mock/point";
import { Mode } from "../mock/const";
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
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  }

  #handleOpenClick = () => {
    this.#replacePointToForm();
  }

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  }

  #handleTypeChange = (evt) => {
    if (evt.target.value === this.#point.type) {
      return
    }

    this.#changeData({ ...this.#point, type: evt.target.value });
  }

  #handleOffersChange = (evt) => {
    const offerId = evt.target.value;
    const offersTemp = [...this.#point.offers];

    const offersRezult = offersTemp?.includes(offerId) ? offersTemp.filter((offer) => offer !== offerId) : [...offersTemp, offerId];

    this.#changeData({ ...this.#point, offers: offersRezult });
  }

  #handleFormSubmit = () => {
    this.#changeData(this.#point);
    this.#replaceFormToPoint();
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({ point, pointGeneralInfo: getPointGeneralInfo(point.type) });
    this.#pointEditComponent = new EditPointView({ point, pointGeneralInfo: getPointGeneralInfo(point.type) });

    this.#pointComponent.setOpenClickHandler(this.#handleOpenClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setTypeChangeHandler(this.#handleTypeChange);
    this.#pointEditComponent.setOffersChangeHandler(this.#handleOffersChange);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent)
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent)
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
      this.#replaceFormToPoint();
    }
  }
}
