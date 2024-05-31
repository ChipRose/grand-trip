import dayjs from 'dayjs';
import { getTotalPrice } from './point-util';
import { SortType } from "../mock/const";

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortDateDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
};

const sortPriceDown = (pointA, pointB) => {
  return pointB.basePrice - pointA.basePrice;
};

const sortTimeDown = (pointA, pointB) => {
  const pointADiff = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDiff = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return dayjs(pointBDiff).diff(dayjs(pointADiff));
};


const sort = {
  [SortType.DEFALT]: (points) => points.sort(sortDateDown),
  [SortType.EVENT]: (points) => points,
  [SortType.TIME]: (points) => points.sort(sortTimeDown),
  [SortType.PRICE]: (points) => points.sort(sortPriceDown),
  [SortType.OFFERS]: (points) => points,
};

export const sorting = ({ points, sortType }) => {
  return sort[sortType](points) || null;
};
