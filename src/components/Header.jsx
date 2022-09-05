import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;

    const totalExpenses = expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const totalValue = acc + value * exchangeRates[currency].ask;
      return totalValue;
    }, 0);

    return (
      <header>

        <div
          data-testid="email-field"
        >
          { userEmail }
        </div>
        <p data-testid="total-field">
          { totalExpenses.toFixed(2) }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: propTypes.string.isRequired,
  // totalExpenses: propTypes.number.isRequired,
  expenses: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.string,
      currency: propTypes.string,
      exchangeRates: propTypes.objectOf(
        propTypes.shape({
          ask: propTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(Header);
