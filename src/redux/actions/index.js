export const EMAIL_ACTION = 'EMAIL_ACTION';

export const addEmailAction = (user) => ({
  type: EMAIL_ACTION,
  user,
});

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(getCurrencies(json)))
    .catch((error) => dispatch(failedRequest(error)));
};
