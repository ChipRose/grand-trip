import { FilterType } from "../mock/const";
import { isPastEvent, isFutureEvent } from "./point-util";

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point)=>isPastEvent(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point)=>isFutureEvent(point.dateFrom)),
}

export { filter };
