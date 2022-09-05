import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchAddExpenses, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  addExpenseButton = () => {
    const { dispatch } = this.props;
    dispatch(fetchAddExpenses(this.state));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;

    const currenciesHtmlElements = currencies.map((currency) => (
      <option key={ currency } value={ currency }>{ currency }</option>
    ));

    const { value, description, currency, method, tag } = this.state;

    return (
      <form>

        <label htmlFor="value-input">
          <input
            data-testid="value-input"
            type="number"
            name="value"
            placeholder="Valor da despesa"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>

        <label htmlFor="description-input">
          <input
            data-testid="description-input"
            type="text"
            name="description"
            placeholder="Descrição da despesa"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>

        <label htmlFor="currency-input">
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currenciesHtmlElements}
          </select>
        </label>

        <label htmlFor="method-input">
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.addExpenseButton }
        >
          Adicionar despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
