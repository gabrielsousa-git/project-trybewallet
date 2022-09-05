import {
  GET_CURRENCIES,
  REQUEST_CURRENCIES,
  FAILED_REQUEST,
  EXPENSES_ACTION,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  total: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state };
  case GET_CURRENCIES:
    return { ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT') };
  case FAILED_REQUEST:
    return { ...state, Error };
  case EXPENSES_ACTION:
    return { ...state,
      expenses: [
        ...state.expenses, {
          ...action.expenses,
          id: state.expenses.length,
        },
      ],
      // total: [...state.expenses, action.expenses].reduce(
      //   (acc, { value, currency, exchangeRates }) => {
      //     const exchendedValue = acc + value * exchangeRates[currency].ask;
      //     return exchendedValue;
      //   },
      //   0,
      // ),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
      // total: state.expenses.reduce(
      //   (acc, { value, currency, exchangeRates }) => {
      //     const sumValues = acc + value * exchangeRates[currency].ask;
      //     const subValues = acc - value * exchangeRates[currency].ask;
      //     return sumValues - subValues;
      //   },
      //   0,
      // ),
    };
  default:
    return state;
  }
}

export default walletReducer;
