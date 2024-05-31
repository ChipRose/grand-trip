import ApiService from '../framework/api-service';

export default class GeneralInfoApiService extends ApiService {
  get destinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse)
  }

  get offers() {
    return this._load({ url: 'offers' })
      .then(ApiService.parseResponse)
  }
}
