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

export const EXPENSES_ACTION = 'EXPENSES_ACTION';

const addExpenses = (expenses) => ({
  type: EXPENSES_ACTION,
  expenses,
});

// export const fetchAddExpenses = (expenses) => async (dispatch) => {
//   const { value, description, currency, method, tag } = expenses;
//   const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const currenciesJson = await currencies.json();
//   delete currenciesJson.USDT;
//   const expense = {
//     id: 0,
//     value,
//     description,
//     currency,
//     method,
//     tag,
//     currencies: currenciesJson,
//   };
//   dispatch(addExpenses(expense));
// };

export const fetchAddExpenses = (expenses) => (
  async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const exchangeRates = await response.json();
      dispatch(addExpenses({ id: 0, ...expenses, exchangeRates }));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  }
);

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});
