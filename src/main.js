import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const contentElement = siteMainElement.querySelector('.trip-events');

render(new FilterView(), filterElement);

const boardPresenter = new BoardPresenter();
boardPresenter.init(contentElement);
