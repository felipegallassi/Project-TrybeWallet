import Proptypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getExpense } from '../actions';

const Alimentação = 'Alimentação';
class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
      description: '',

    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const api = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await api.json();
    console.log(data);
    const { object } = this.props;
    const items = { ...this.state, exchangeRates: data };
    object(items);
    const { id } = this.state;
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
    });
  };

  render() {
    const { value, description, method, currency, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          <input
            type="number"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
            // placeholder="valor"
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
            data-testid="currency-input"
          >
            {currencies.map((curr) => (
              <option value={ curr } key={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          <select
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
            // placeholder="Despesa"
          />
        </label>
        <button
          type="button"
          id="addBtn"
          name="addBtn"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  object: (value) => dispatch(getExpense(value)),
});

Form.propTypes = {
  currencies: Proptypes.arrayOf(Proptypes.string).isRequired,
  object: Proptypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
