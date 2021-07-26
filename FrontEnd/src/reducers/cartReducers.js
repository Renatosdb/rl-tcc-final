import {ADD_ITEM, REMOVE_ITEM} from "../constants/cartConstants";


function cartReducer( state= {cartItems:[]}, action){

  switch (action.type) {
    case ADD_ITEM:
      const item = action.payload;
      const  prod = state.cartItems.find(p => p.product === item.product);
      if(prod)
        return  {cartItems: state.cartItems.map( c => c.product === prod.product ? item : c)}

      return  {cartItems: [...state.cartItems, item]}
    case REMOVE_ITEM:
      return  {cartItems: state.cartItems.filter( c => c.product !== action.payload )}

    default:
      return state;
  }
}

export {cartReducer}
