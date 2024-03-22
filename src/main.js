import FilterView from './view/filter-view';
import NewPointButtonView from './view/new-point-button-view';
import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/points-model';
import './model/api-temp';
import { render } from './framework/render';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pointsControlElement = siteHeaderElement.querySelector('.trip-main')
const contentElement = siteMainElement.querySelector('.trip-events');

render(new FilterView(), filterElement);
render(new NewPointButtonView(), pointsControlElement);

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter(contentElement, pointsModel);

boardPresenter.init();
