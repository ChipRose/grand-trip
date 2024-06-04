import Observable from "../framework/observable";
import { FilterType } from "../mock/const";

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  constructor(){
    super();
  }

  get filter() {
    return this.#filter;
  }

  setFilter = ({ updateType, filter }) => {
    this.#filter = filter;
    this._notify(updateType, filter)
  };
}
