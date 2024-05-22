import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import './model/api-temp';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const pointsControlContainer = siteHeaderElement.querySelector('.trip-main');
const filterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const boardContainer = siteMainElement.querySelector('.page-body__container');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({ boardContainer, pointsControlContainer, pointsModel, filterModel });
const filterPresenter = new FilterPresenter({ filterContainer, filterModel, pointsModel });

boardPresenter.init();
filterPresenter.init();
