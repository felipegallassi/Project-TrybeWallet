export const USER_LOGIN = 'USER_LOGIN';
export const LOADING_TRUE = 'LOADING_TRUE';
export const RESPONSE = 'RESPONSE';
export const GET_EXPENSES = 'GET_EXPENSES';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const fetchMoedas = () => (
  async (dispatch) => {
    dispatch({ type: LOADING_TRUE });
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data)
      .filter((item) => item !== 'USDT');
    dispatch({ type: RESPONSE,
      payload: currencies });
  });

export const getExpense = (expense) => ({
  type: GET_EXPENSES,
  expense,
});
