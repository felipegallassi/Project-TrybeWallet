import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenses } from '../actions';

class Table extends React.Component {
    handleClick = ({ target }) => {
      const { expenses, dispatch } = this.props;
      const removed = expenses
        .filter((expense) => Number(expense.id) !== Number(target.id));
      dispatch(removeExpenses(removed));
    };

    render() {
      const { expenses } = this.props;
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Método de pagamento</th>
                <th>Tag</th>
                <th>Moeda</th>
                <th>Câmbio utilizado</th>
                <th>Valor convertido</th>
                <th>Moeda de conversão</th>
                <th>Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>
              { expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>
                    { Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2) }
                  </td>
                  <td>
                    { Number(expense.value * expense.exchangeRates[expense.currency].ask)
                      .toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button type="button">Editar</button>
                    <button
                      type="button"
                      id={ expense.id }
                      data-testid="delete-btn"
                      onClick={ this.handleClick }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
