import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <header>
          <Header />
        </header>

        <div>
          <WalletForm />
        </div>

        <div>
          <Table />
        </div>
      </main>

    );
  }
}

export default Wallet;
