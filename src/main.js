import { render } from './framework/render';
import { ApiInfo } from './util/const';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import NewPointButtonView from './view/new-point-button-view';
import GeneralInfoModel from './model/general-info-model';
import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointsApiService from './api-services/points-api-service';
import GeneralInfoApiService from './api-services/general-info-api-service';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const pointsControlContainer = siteHeaderElement.querySelector('.trip-main');
const filterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const boardContainer = siteMainElement.querySelector('.page-body__container');

const pointsModel = new PointsModel(new PointsApiService(ApiInfo.END_POINT, ApiInfo.AUTHORIZATION));
const generalInfoModel = new GeneralInfoModel(new GeneralInfoApiService(ApiInfo.END_POINT, ApiInfo.AUTHORIZATION));
const filterModel = new FilterModel();
const newPointButtonComponent = new NewPointButtonView();
const boardPresenter = new BoardPresenter({ boardContainer, pointsControlContainer, pointsModel, generalInfoModel, filterModel });
const filterPresenter = new FilterPresenter({ filterContainer, filterModel, pointsModel });

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  boardPresenter.createTask(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
}

boardPresenter.init();
filterPresenter.init();
generalInfoModel.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, pointsControlContainer);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });
