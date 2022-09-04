import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, totalExpenses } = this.props;

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
  totalExpenses: state.wallet.total,
});

Header.propTypes = {
  userEmail: propTypes.string.isRequired,
  totalExpenses: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
