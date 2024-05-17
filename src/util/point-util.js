import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
dayjs.extend(duration).extend(utc);
import { NoPointMessage, DateFormat } from "../mock/const";
import { getRandomInteger, getNullFormat } from "./common-util";
import { getOffersByType } from "../mock/point";

export const humanizePointDate = (date) => dayjs(date).format(DateFormat.DATE) || '';
export const humanizePointDateTime = (date) => dayjs(date).format(DateFormat.DATE_TIME) || '';
export const humanizePointTime = (date) => dayjs(date).format(DateFormat.TIME) || '';

export const getUtcDate = (date) => (dayjs(date).utc().format());

export const getRandomDate = () => {
  const dateFrom = getUtcDate(dayjs(dayjs().set('d', getRandomInteger(0, 30)).set('M', getRandomInteger(0, 11)).set('h', getRandomInteger(0, 24)).set('m', getRandomInteger(0, 60))));
  const dateTo = getUtcDate(dayjs(dayjs(dateFrom).add(getRandomInteger(0, 3), 'day').add(getRandomInteger(0, 24), 'hour').add(getRandomInteger(0, 60), 'minute')));
  const hourFrom = dayjs(dateFrom).get('hour');
  const minutesFrom = dayjs(dateFrom).get('minute');

  return { dateFrom, dateTo, hourFrom, minutesFrom };
};

export const getDurationTime = ({ dateFrom, dateTo }) => {
  const dateStart = dayjs(dateFrom);
  const dateEnd = dayjs(dateTo);
  return dayjs.duration(dateEnd.diff(dateStart));
};

export const formatDurationTime = ({ dateFrom, dateTo }) => {
  const dayDuration = getDurationTime({ dateFrom, dateTo });
  const date = {
    MON: dayDuration.get('month'),
    D: dayDuration.get('days'),
    H: dayDuration.get('hour'),
    M: dayDuration.get('minute'),
  };
  let rez = '';
  Object.entries(date).forEach(([key, value]) => {
    if (value) rez += getNullFormat(value) + key + ' '
  })
  return rez.trim();
};

export const getNoPointMessage = (filterType = 'EVERYTHING') => {
  return NoPointMessage[filterType];
};

export const isPastEvent = (dateFrom) => dateFrom && dayjs().isAfter(dateFrom, 'D');
export const isFutureEvent = (dateFrom) => dateFrom && dayjs().isBefore(dateFrom, 'D');

export const getOffersPrice = ({ type, offersSelected }) => {
  let offersPrice = 0;

  offersSelected?.forEach((offerSelected) => {
    const price = getOffersByType(type).find(({ id }) => id.toString() === offerSelected)?.price || 0;
    offersPrice += price;
  });

  return ({ offersPrice });
}

