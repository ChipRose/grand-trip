import { FilterType } from "../mock/const";
import { isPastEvent, isFutureEvent } from "./point-util";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureEvent({dateFrom:point.dateFrom, dateTo:point.dateTo})),
  [FilterType.PAST]: (points) => points.filter((point) => isPastEvent(point.dateFrom)),
};

export const filtering = ({ points, filterType }) => {
  return filter[filterType](points) || null;
}
