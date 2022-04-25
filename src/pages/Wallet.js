import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchMoedas } from '../actions';
import Loading from '../components/Loading';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMoedas());
  }

  render() {
    const { isLoading } = this.props;
    return (
      <section>
        <Header />
        {isLoading ? <Loading />
          : <Form />}
        <Table />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.wallet.Loading,
});

Wallet.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
