import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      moedaSelecionada: 'USD',
      pagamento: 'Dinheiro',
      categoria: 'Alimentação',
      despesa: '',

    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { valor, moedaSelecionada, pagamento, categoria, despesa } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          <input
            type="text"
            id="valor"
            name="valor"
            value={ valor }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="moedaSelecionada">
          Moeda
          <select
            id="moedaSelecionada"
            name="moedaSelecionada"
            onChange={ this.handleChange }
            value={ moedaSelecionada }
          >
            {currencies.map((curr) => (
              <option value={ curr } key={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="pagamento">
          <select
            id="pagamento"
            name="pagamento"
            value={ pagamento }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="crédito">Cartão de crédito</option>
            <option value="débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          <select
            id="categoria"
            name="categoria"
            value={ categoria }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <label htmlFor="despesa">
          <input
            id="despesa"
            name="despesa"
            value={ despesa }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Form);
