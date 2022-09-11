import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './tests/helpers/renderWith';
import App from './App';

describe('Testando a page <Login.jsx />', () => {
  const EMAIL = 'alguem@email.com';
  const SENHA = '123456';

  test('Os elementos são exibidos corretamente na tela', () => {
    // acessar
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Senha/i);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    // aferir
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('A aplicação é redirecionada para a página "Wallet" após efetuar o login', () => {
    // acessar
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Senha/i);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    // agir
    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, SENHA);

    expect(emailInput).toHaveValue(EMAIL);
    expect(passwordInput).toHaveValue(SENHA);

    userEvent.click(loginButton);

    // aferir
    expect(history.location.pathname).toBe('/carteira');
  });
});
