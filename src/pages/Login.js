import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../actions';
import emailValidation from '../helpers/emailValidation';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      btnDisabled: true,

    };
  }

  handleChange =({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.ValidateBtn());
  }

  ValidateBtn = () => {
    const { email, password } = this.state;
    const passwordMinLength = 6;
    if (emailValidation(email)
    && password.length >= passwordMinLength) {
      return this.setState({
        btnDisabled: false,
      });
    }
    this.setState({
      btnDisabled: true,
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(userLogin(email));
    history.push('/carteira');
  }

  render() {
    const { password, email, btnDisabled } = this.state;
    return (
      <form onSubmit={ this.handleLogin }>
        <input
          type="email"
          data-testid="email-input"
          placeholder="alguem@email.com"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="insira sua senha"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          onClick={ this.handleLogin }
          disabled={ btnDisabled }
        >
          Entrar
        </button>
      </form>);
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
