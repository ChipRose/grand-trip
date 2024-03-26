import { sorting } from "../util/sorting-util";

export const generateSorting = (points) => Object.entries(sorting).map(([sortingName, sortingPoints]) => ({
  name: sortingName,
  count: sortingPoints(points)?.length
}))
