import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  // state = {
  //   wallet: {
  //     currencies: [], // array de string
  //     expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  //     editor: false, // valor booleano que indica de uma despesa está sendo editada
  //     idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  //   },
  // };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    currencies.splice(1, 1);
    // const currenciesHtmlElements = Object.keys(currencies).map((currencie) => (
    //   <option key={ currencie } value={ currencie }>{ currencie }</option>
    // ));

    const currenciesHtmlElements = currencies.map((currencie) => (
      <option key={ currencie } value={ currencie }>{ currencie }</option>
    ));

    return (
      <form>

        <label htmlFor="value-input">
          <input
            data-testid="value-input"
            type="number"
            name="value-input"
            placeholder="Valor da despesa"
          />
        </label>

        <label htmlFor="description-input">
          <input
            data-testid="description-input"
            type="text"
            name="description-input"
            placeholder="Descrição da despesa"
          />
        </label>

        <label htmlFor="currency-input">
          <select
            data-testid="currency-input"
            name="currency-input"
          >
            {currenciesHtmlElements}
          </select>
        </label>

        <label htmlFor="method-input">
          <select
            data-testid="method-input"
            name="method-input"
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao_de_credito">Cartão de crédito</option>
            <option value="cartao_de_debito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          <select
            data-testid="tag-input"
            name="tag-input"
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.shape({
    map: propTypes.func.isRequired,
    splice: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
