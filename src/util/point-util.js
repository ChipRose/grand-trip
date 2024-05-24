import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
dayjs.extend(duration).extend(utc);
import { NoPointMessage, DateFormat } from "../mock/const";
import { getNullFormat } from "./common-util";
import { getOffersByType } from "../mock/point";

export const humanizePointDate = (date) => dayjs(date).format(DateFormat.DATE) || '';
export const humanizePointDateTime = (date) => dayjs(date).format(DateFormat.DATE_TIME) || '';
export const humanizePointTime = (date) => dayjs(date).format(DateFormat.TIME) || '';

export const getUtcDate = (date) => (dayjs(date).utc().format());

export const getDurationTime = ({ dateFrom, dateTo }) => {
  const dateStart = dayjs(dateFrom);
  const dateEnd = dayjs(dateTo);
  return dayjs.duration(dateEnd.diff(dateStart));
};

export const formatDurationTime = ({ dateFrom, dateTo }) => {
  const dayDuration = getDurationTime({ dateFrom, dateTo });
  const date = {
    MON: dayDuration.get('month') || '00',
    D: dayDuration.get('days') || '00',
    H: dayDuration.get('hour') || '00',
    M: dayDuration.get('minute') || '00',
  };
  let rez = '';
  for (const [key, value] of Object.entries(date)) {
    if (value !== '00') {
      const tempDate = Object.entries(date);
      const index = tempDate.findIndex(([keyTemp,]) => keyTemp === key);

      tempDate.slice(index).forEach(([key, value]) => (rez += getNullFormat(value) + key + " "));
      return rez;
    }
  }

  return rez.trim();
};

export const getNoPointMessage = (filterType = 'EVERYTHING') => {
  return NoPointMessage[filterType];
};

export const isPastEvent = (dateFrom) => dateFrom && dayjs().isAfter(dateFrom, 'D');
export const isFutureEvent = (dateFrom) => dateFrom && dayjs().isBefore(dateFrom, 'D');

export const getTotalPrice = ({ type, offersSelected, basePrice }) => {
  let offersPrice = 0;

  offersSelected?.forEach((offerSelected) => {
    const price = getOffersByType(type).find(({ id }) => id === offerSelected)?.price || 0;
    offersPrice += price;
  });

  return (basePrice + offersPrice);
}

export const getDateInterval = (points) => {
  const startDate = dayjs(points[0]?.dateFrom);
  const endDate = dayjs(points[points?.length - 1].dateTo);

  if (startDate.get('month') === endDate.get('month') && startDate.get('year') === endDate.get('year')) {
    return `${humanizePointDate(startDate)}&nbsp;&mdash;&nbsp;${endDate.get('date')}`;
  }
  return `${humanizePointDate(startDate)}&nbsp;&mdash;&nbsp;${humanizePointDate(endDate)}`;
}

