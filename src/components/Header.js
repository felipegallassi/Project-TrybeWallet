import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

const Header = ({ email, expenses, currency }) => {
  const somaTotal = expenses.length <= 0 ? 0 : expenses
    .map((exp) => exp.exchangeRates[exp.currency].ask * exp.value)
    .reduce((a, b) => a + b, 0).toFixed(2);
  return (
    <header>
      <p data-testid="email-field">{email}</p>
      <div>
        <p data-testid="total-field">
          {somaTotal}
        </p>
        {' '}
        <p data-testid="header-currency-field">
          {currency}
        </p>
      </div>
    </header>
  );
};

Header.propTypes = {
  email: Proptypes.string.isRequired,
  expenses: Proptypes.arrayOf(Proptypes.string).isRequired,
  currency: Proptypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currency: state.wallet.currency,
});

export default connect(mapStateToProps)(Header);
