import {  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCESS, PRODUCT_LIST_FAIL,PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCESS} from '../constants/productConstants';
import axios from 'axios';


const listProducts = () => async (dispatch) => {
  try {
    dispatch( {type: PRODUCT_LIST_REQUEST});
    console.log('get -> part. 1');
    const {data} = await axios.get("/api/products");
    console.log('get -> part. 2');
    dispatch({type: PRODUCT_LIST_SUCESS, payload: data});
  } catch (error) {
    dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
  }

}
const detailsProduct = (id) => async  (dispatch) => {
  try {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: id});
    console.log('get -> part. 1');
    const {data} = await axios.get("/api/products/" + id);
    console.log('get -> part. 2');
    dispatch({type: PRODUCT_DETAILS_SUCESS, payload: data});
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};
// const getStock = (product_id) => async (dispatch) => {
//   try {
//     dispatch( {type: PRODUCT_LIST_REQUEST, payload: product_id});
//     console.log('get -> stock -> ' + product_id);
//     console.log("/api/stocks/" + product_id);
//     const {stock} = await axios.get("/api/stocks/" + product_id);
//     console.log('get -> part stock. 2');
//     dispatch({type: PRODUCT_LIST_SUCESS, payload: stock});
//     console.log('get -> part stock. 3');
//   } catch (error) {
//     dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
//   }
//
// };
export {listProducts,  detailsProduct}
