import { filter } from '../util/filter-util';

export const generateFilter = (points) => Object.entries(filter).map(([filterName, filterPoints]) => ({
  name: filterName,
  count: filterPoints(points)?.length
}))
