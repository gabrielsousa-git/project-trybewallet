import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    const tableHtmlElements = expenses.map((expense) => {
      const { id, description, tag, method, currency, exchangeRates } = expense;
      const { dispatch } = this.props;
      return (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ Number(expense.value).toFixed(2) }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
          <td>
            {(
              Number(exchangeRates[currency].ask) * Number(expense.value).toFixed(2))
              .toFixed(2)}
          </td>
          <td>Real</td>
          <td>
            <button type="button">Editar</button>
            <button
              data-testid="delete-btn"
              type="button"
              onClick={ () => dispatch(deleteExpense(id)) }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>
            { tableHtmlElements }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      value: propTypes.string,
      description: propTypes.string,
      currency: propTypes.string,
      method: propTypes.string,
      tag: propTypes.string,
      exchangeRates: propTypes.objectOf(
        propTypes.shape({
          name: propTypes.string,
          ask: propTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
