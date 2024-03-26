import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/points-model';
import './model/api-temp';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const pointsControlContainer = siteHeaderElement.querySelector('.trip-main');
const boardContainer = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({ boardContainer, pointsControlContainer, pointsModel });

boardPresenter.init();
