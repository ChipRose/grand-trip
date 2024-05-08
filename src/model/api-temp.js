const SERVER = 'https://17.ecmascript.htmlacademy.pro/big-trip/';
const GET_OFFERS_LINK = `${SERVER}offers`;
const GET_POINTS_LINK = `${SERVER}points`;
const GET_DESTINATIONS_LINK = `${SERVER}destinations`;

const bearerOffers = 'Basic kTy9gIdsz2317rD';
const bearerPoints = 'Basic kTy9gIdsz2317rD';
const bearerDestinations = 'Basic kTy9gIdsz2317rD';

const getOffers = (onSuccess, onError = () => { }) => {
  fetch(GET_OFFERS_LINK, {
    method: 'GET',
    headers: {
      'Authorization': bearerOffers
    }
  })
    .then((response) => {
      if (response.ok) {
        const products = response.json();
        return products;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((offers) => onSuccess(offers))
    .catch((error) => onError(error));
};

const getPoints = (onSuccess, onError = () => { }) => {
  fetch(GET_POINTS_LINK, {
    method: 'GET',
    headers: {
      'Authorization': bearerPoints
    }
  })
    .then((response) => {
      if (response.ok) {
        const products = response.json();
        return products;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((points) => onSuccess(points))
    .catch((error) => onError(error));
};

const getDestinations = (onSuccess, onError = () => { }) => {
  fetch(GET_DESTINATIONS_LINK, {
    method: 'GET',
    headers: {
      'Authorization': bearerDestinations
    }
  })
    .then((response) => {
      if (response.ok) {
        const products = response.json();
        return products;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((destinations) => onSuccess(destinations))
    .catch((error) => onError(error));
};

getOffers((offers) => {
  console.log('Server offers', offers);
})

getPoints((points) => {
  console.log('Server points', points);
})

getDestinations((destinations) => {
  console.log('Server destinations', destinations);
})

