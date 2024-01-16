import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ContentView from './view/content-view.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const contentElement = siteMainElement.querySelector('.trip-events');

render(new FilterView(), filterElement);
render(new SortView(), contentElement);
render(new ContentView(), contentElement);