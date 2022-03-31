import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Header = ({ email, expenses, currency }) => (
  <header>
    <p data-testid="email-field">{email}</p>
    <p>
      <p data-testid="total-field">
        { expenses }
      </p>
      {' '}
      <p data-testid="header-currency-field">
        {currency}
      </p>
    </p>
  </header>
);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currency: state.wallet.currency,
});

export default connect(mapStateToProps)(Header);
