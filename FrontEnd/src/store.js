import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {productDetailsReducer, productListReducer} from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import {userSigninReducer} from './reducers/userReducers';
import {userRegisterReducer} from './reducers/userReducers';
import thunk from 'redux-thunk';
import cookie from "js-cookie"

const cartItems = cookie.getJSON("itens") || [];
const user = cookie.getJSON('user') || null;

const initialState = {cart:{cartItems, shipping: {}, payment: {}},   userSignin: { user },};
const reducer = combineReducers({
  productList:       productListReducer,
  productDetails:    productDetailsReducer,
  // getStocks:         getStockReducer,
  cart:              cartReducer,
  userSignin:        userSigninReducer,
  userRegister:      userRegisterReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
