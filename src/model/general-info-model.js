
import Observable from "../framework/observable";
import { UpdateType } from "../mock/const";

export default class GeneralInfoModel extends Observable {
  #destinations = [];
  #offersByType = [];

  #generalInfoApiService = null;

  constructor(generalInfoApiService) {
    super();
    this.#generalInfoApiService = generalInfoApiService;
  }

  get generalInfo() {
    return ({
      destinations: this.#destinations,
      offersByType: this.#offersByType
    });
  }

  get offers() {
    return this.#offersByType
  }

  init = async () => {
    try {
      this.#destinations = await this.#generalInfoApiService.destinations;
      this.#offersByType = await this.#generalInfoApiService.offers;
    } catch {
      this.#destinations = [];
      this.#offersByType = [];
    }

    this._notify(UpdateType.MAJOR, null);
  }
}
