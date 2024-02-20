import FilterView from './view/filter-view';
import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/points-model';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const contentElement = siteMainElement.querySelector('.trip-events');

render(new FilterView(), filterElement);

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter();

boardPresenter.init(contentElement, pointsModel);
