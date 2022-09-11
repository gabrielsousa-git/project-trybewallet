import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './tests/helpers/renderWith';
import App from './App';

describe('Testando a page <Wallet.jsx />', () => {
  test('Os elementos são exibidos corretamente na tela', () => {
    // acessar
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const valueInput = screen.getByPlaceholderText(/Valor da despesa/i);
    const descriptionInput = screen.getByPlaceholderText(/Descrição da despesa/i);
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addExpenseButton = screen.getByRole('button', { name: /adicionar/i });

    // aferir
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(addExpenseButton).toBeInTheDocument();
  });

  test(
    'A despesa é renderizada na tela com os dados preeenchidos',
    async () => {
      global.fetch = jest.fn(async () => ({
        json: async () => mockData,
      }));

      // acessar
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
      const valueInput = screen.getByPlaceholderText(/Valor da despesa/i);
      const descriptionInput = screen.getByPlaceholderText(/Descrição da despesa/i);
      const currencyInput = screen.getByTestId('currency-input');
      const methodInput = screen.getByTestId('method-input');
      const tagInput = screen.getByTestId('tag-input');
      const addExpenseButton = screen.getByRole('button', { name: /adicionar/i });

      userEvent.type(valueInput, '10');
      userEvent.type(descriptionInput, 'teste');
      waitFor(() => {
        userEvent.selectOptions(currencyInput, 'BTC');
      });
      userEvent.selectOptions(methodInput, 'Cartão de crédito');
      userEvent.selectOptions(tagInput, 'Lazer');

      // agir
      userEvent.click(addExpenseButton);

      // aferir
      waitFor(() => expect(global.fetch).toBeCalled());
      waitFor(() => {
        const totalField = screen.getByTestId('total-field');
        expect(totalField).toHaveTextContent('1118.60');
      });
    },
  );
});
