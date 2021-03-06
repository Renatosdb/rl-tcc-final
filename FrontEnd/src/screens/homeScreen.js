
import React, { useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch } from "react-redux";
import {listProducts} from '../actions/productActions';



function HomeScreen(p){

  const productList = useSelector(state => state.productList);
  const {products, loading, error} = productList;
  const dispatch = useDispatch();
  useEffect(() => { dispatch(listProducts()) }, [dispatch]);



  return loading? <div>loading...</div>:
         error? <div>{error}</div>:

  <ul className="products">
  {
    products.map( product =>
      <li key={product.id}>
        <div className="product">
        <Link to={'/product/' + product.id}>  <img className="product-image" src={product.image} alt="products"/> </Link>
        <div className="product-name">
        <Link to={'/product/' + product.id}>{product.name} </Link>
        </div>
        <div className="product-brand"> {product.brand}</div>
        <div className="product-price"> R$ {product.price}</div>
        <div className="product-rating">{product.rating} Estrelas ({product.numberReiews}) vistos</div>
      </div>
      </li>
    )
  }

  </ul>

}
export default HomeScreen;
