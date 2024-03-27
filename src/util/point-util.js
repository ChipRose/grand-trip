import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import { NoPointMessage, DateFormat } from "../mock/const";
dayjs.extend(duration);

const humanizePointDate = (date) => dayjs(date).format(DateFormat.DATE) || '';
const humanizePointDateTime = (date) => dayjs(date).format(DateFormat.DATE_TIME) || '';
const humanizePointTime = (date) => dayjs(date).format(DateFormat.TIME) || '';

const getDurationTime = ({ dateFrom, dateTo }) => {
  const dateStart = dayjs(dateFrom);
  const dateEnd = dayjs(dateTo);
  return dayjs.duration(dateEnd.diff(dateStart));
};

const formatDurationTime = ({ dateFrom, dateTo }) => {
  const dayDuration = getDurationTime({ dateFrom, dateTo });
  const days = dayDuration.get('days');
  if (days) return dayDuration.format(DateFormat.LONG_TIME);
  if (!days && dayDuration.get('hours')) return dayDuration.format(DateFormat.MIDDLE_TIME);
  return dayDuration.format(DateFormat.SHORT_TIME);
};

const getNoPointMessage = (filterType = 'EVERYTHING') => {
  return NoPointMessage[filterType];
};

const isPastEvent = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');
const isFutureEvent = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');


export { humanizePointDate, humanizePointTime, formatDurationTime, humanizePointDateTime, getNoPointMessage, isPastEvent, isFutureEvent };
