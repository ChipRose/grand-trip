import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { NoPointMessage, DateFormat } from "../mock/const";
import { getRandomInteger, getNullFormat } from "./common-util";
dayjs.extend(duration);
dayjs.extend(utc);

const humanizePointDate = (date) => dayjs(date).format(DateFormat.DATE) || '';
const humanizePointDateTime = (date) => dayjs(date).format(DateFormat.DATE_TIME) || '';
const humanizePointTime = (date) => dayjs(date).format(DateFormat.TIME) || '';

const getUtcDate = (date) => (dayjs(date).utc().format());

const getRandomDate = () => {
  const dateFrom = getUtcDate(dayjs(dayjs().set('d', getRandomInteger(0, 30)).set('M', getRandomInteger(0, 11)).set('h', getRandomInteger(0, 24)).set('m', getRandomInteger(0, 60))));
  const dateTo = getUtcDate(dayjs(dayjs(dateFrom).add(getRandomInteger(0, 3), 'day').add(getRandomInteger(0, 24), 'hour').add(getRandomInteger(0, 60), 'minute')));
  const hourFrom = dayjs(dateFrom).get('hour');
  const minutesFrom = dayjs(dateFrom).get('minute');

  return { dateFrom, dateTo, hourFrom, minutesFrom };
};


const getDurationTime = ({ dateFrom, dateTo }) => {
  const dateStart = dayjs(dateFrom);
  const dateEnd = dayjs(dateTo);
  return dayjs.duration(dateEnd.diff(dateStart));
};

const formatDurationTime = ({ dateFrom, dateTo }) => {
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
  return rez.trim()
};

const getNoPointMessage = (filterType = 'EVERYTHING') => {
  return NoPointMessage[filterType];
};

const isPastEvent = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');
const isFutureEvent = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');

export { getRandomDate, getUtcDate, humanizePointDate, humanizePointTime, formatDurationTime, humanizePointDateTime, getNoPointMessage, isPastEvent, isFutureEvent };
