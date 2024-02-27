import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const dateFormat = {
  DATE: 'MMM D',
  TIME: 'HH:mm',
  DATE_TIME: 'DD[/]MM[/]YY[&nbsp;]HH[:]mm',
  LONG_TIME: 'DD[D] HH[H] mm[M]',
  MIDDLE_TIME: 'HH[H] mm[M]',
  SHORT_TIME: 'mm[M]'
};

const humanizePointDate = (date) => dayjs(date).format(dateFormat.DATE) || '';
const humanizePointDateTime = (date) => dayjs(date).format(dateFormat.DATE_TIME) || '';
const humanizePointTime = (date) => dayjs(date).format(dateFormat.TIME) || '';

const getDurationTime = ({ dateFrom, dateTo }) => {
  const dateStart = dayjs(dateFrom);
  const dateEnd = dayjs(dateTo);
  return dayjs.duration(dateEnd.diff(dateStart));
};

const formatDurationTime = ({ dateFrom, dateTo }) => {
  const dayDuration = getDurationTime({ dateFrom, dateTo });
  const days = dayDuration.get('days');
  if (days) return dayDuration.format(dateFormat.LONG_TIME);
  if (!days && dayDuration.get('hours')) return dayDuration.format(dateFormat.MIDDLE_TIME);
  return dayDuration.format(dateFormat.SHORT_TIME);
};

export { humanizePointDate, humanizePointTime, formatDurationTime, humanizePointDateTime };
