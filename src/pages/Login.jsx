import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addEmailAction } from '../redux/actions';

class Login extends Component {
  state = {
    isDisabled: true,
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.handleValidationButton());
  };

  handleValidationButton = () => {
    const { password, email } = this.state;
    const validation = (/^\S+@\S+\.\S+$/);
    const emailValid = validation.test(email);
    const minLength = 5;
    const validateLogin = emailValid && password.length > minLength;
    this.setState({ isDisabled: !validateLogin });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(addEmailAction(this.state));
    history.push('/carteira');
  };

  render() {
    const { isDisabled, email, password } = this.state;

    return (
      <main>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ email }
            required
          />
        </label>

        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            onChange={ this.handleChange }
            value={ password }
            required
          />
        </label>

        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: propTypes.string.isRequired,
  history: propTypes.string.isRequired,
};

export default connect()(Login);
