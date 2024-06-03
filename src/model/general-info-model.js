
import Observable from "../framework/observable";
import { UpdateType, Status } from "../mock/const";

export default class GeneralInfoModel extends Observable {
  #destinations = [];
  #offersByType = [];

  #generalInfoApiService = null;
  #status = Status.OK;

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

  get status() {
    if (!this.#destinations?.length || !this.#offersByType?.length) {
      return this.#status = Status.ERROR;
    }

    return this.#status = Status.OK;
  }

  get offers() {
    return this.#offersByType;
  }

  init = async () => {
    try {
      this.#destinations = await this.#generalInfoApiService.destinations;
      this.#offersByType = await this.#generalInfoApiService.offers;
    } catch (err) {
      this.#destinations = [];
      this.#offersByType = [];
      throw new Error('Can\'t load general info', err);
    }

    this._notify(UpdateType.MAJOR, null);
  }
}
