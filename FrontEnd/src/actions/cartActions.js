import {ADD_ITEM , REMOVE_ITEM} from "../constants/cartConstants";
import axios from "axios";
import cookie from "js-cookie"

const addToCart = (productId, productQty) => async  (dispatch, getState) => {
  try {
    const {data} = await axios.get("/api/products/" + productId);
    const {cart: {cartItems}} = getState();
    cookie.set("itens", JSON.stringify(cartItems));
    console.log(data.id)
    dispatch({
      type: ADD_ITEM,
      payload: {
        product:      data.id,
        name:         data.name,
        image:        data.image,
        brand:        data.brand,
        rating:       data.rating,
        count:        data.count,
        price:        data.price,
        productQty:  productQty
      }
    });


  } catch (error) {

  }
}
const removeFromCartById = (productId) => (dispatch, getState) => {
  try {
    dispatch({type: REMOVE_ITEM, payload: productId});
    const {cart: {cartItems}} = getState();
    cookie.set("Itens", JSON.stringify(cartItems));
  } catch (error) {

  }
}
export {addToCart, removeFromCartById}