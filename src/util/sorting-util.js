import dayjs from 'dayjs';
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

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPriceDown = (pointA, pointB) => {
  return pointB.basePrice - pointA.basePrice;
};

const sortTimeDown = (pointA, pointB) => {
  const pointADiff = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDiff = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return dayjs(pointBDiff).diff(dayjs(pointADiff));
};


const sorting = {
  [SortType.DAY]: (points) => points.sort(sortDateDown),
  [SortType.EVENT]: (points) => points,
  [SortType.TIME]: (points) => points.sort(sortTimeDown),
  [SortType.PRICE]: (points) => points.sort(sortPriceDown),
  [SortType.OFFERS]: (points) => points,
}

const getSorting = (sortType)=>{
  return sorting[sortType];
}

export { getSorting, sortDateDown, sortPriceDown, sortTimeDown };
