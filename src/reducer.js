import _ from 'lodash';

const ADD_TOKEN = 'ADD_TOKEN';
const DELETE_TOKEN = 'DELETE_TOKEN';

const ADD_USER_DATA = 'ADD_USER_DATA';
const DELETE_USER_DATA = 'DELETE_USER_DATA';

const ADD_ITEM_TO_BASKET = 'ADD_ITEM_TO_BASKET';
const DELETE_ITEM_TO_BASKET = 'DELETE_ITEM_TO_BASKET';

const initialState = {
  userData: JSON.parse( localStorage.getItem('userData') ),
  token: localStorage.getItem('token'),
  basket: localStorage.getItem('basket') || [],
};

export const addToken = (token) => ({ type: ADD_TOKEN, payload: token });
export const removeToken = () => ({ type: DELETE_TOKEN });
export const addUserData = (data) => ({ type: ADD_USER_DATA, payload: data });
export const removeUserData = () => ({ type: DELETE_USER_DATA });
export const addItemToBasket = (data) => ({ type: ADD_ITEM_TO_BASKET, payload: data });
export const removeItemToBasket = (data) => ({ type: DELETE_ITEM_TO_BASKET, payload: data });

export default (state = initialState, action) => {
  console.log('state', state);
  console.log('action', action);
  let basket = [];
  switch (action.type) {
    case ADD_TOKEN:
      localStorage.setItem('token', action.payload);
      return { ...state, token: action.payload };
    case DELETE_TOKEN:
      localStorage.removeItem('token');
      return { ...state, token: null };
    case ADD_USER_DATA:
      localStorage.setItem('userData', JSON.stringify(action.payload));
      return { ...state, userData: action.payload };
    case DELETE_USER_DATA:
      localStorage.removeItem('userData');
      return { ...state, userData: null };
    case ADD_ITEM_TO_BASKET:
      if (localStorage.getItem('basket') !== null) {
        basket = JSON.parse(localStorage.getItem('basket'));
      }
      basket.push(action.payload);
      localStorage.setItem('basket', JSON.stringify(basket));
      return { ...state, basket };
    case DELETE_ITEM_TO_BASKET:
      if (localStorage.getItem('basket') !== null) {
        basket = JSON.parse(localStorage.getItem('basket'));
      }
      _.remove(basket, {
        id: action.payload.id,
      });
      localStorage.setItem('basket', JSON.stringify(basket));
      return { ...state, basket };
    default:
      return state;
  }
};
