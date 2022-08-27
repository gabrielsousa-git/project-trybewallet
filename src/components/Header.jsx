import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  state = {
    totalExpenses: 0,
  };

  render() {
    const { userEmail } = this.props;
    const { totalExpenses } = this.state;

    return (
      <header>

        <div
          data-testid="email-field"
        >
          { userEmail.email }
        </div>
        <p data-testid="total-field">
          { totalExpenses }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user,
});

Header.propTypes = {
  userEmail: propTypes.shape({
    email: propTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
