import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {detailsProduct} from '../actions/productActions';
import {useSelector, useDispatch} from "react-redux";



function ProductScreen(p){
  const productId = p.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();
  const {product, loading, error} = productDetails;
  const [productsQty, setProductsQty ] = useState(1);

  // const productsStock = useSelector((state) => state.getStocks);
  // const {stock} = productsStock;
  useEffect(() => {
      dispatch(detailsProduct(productId));
  }, []);
  const addToCart = () =>{
      p.history.push("/cart/" + productId + "?qty=" + productsQty )
  }


  return  <div>
            <div className="back-to-result">
              <Link to="/"> Voltar </Link>
            </div>
            {
              loading? <div> Loading... </div>:
                  error? <div>{error}</div>:
                      (
                          <div className="details">
                            <div className="details-image">
                              <img src={'../' + product.image} alt="products"/>

                            </div>
                            <div className="details-info">
                              <ul>
                                <li>
                                  <h4>{product.name} </h4>
                                </li>
                                <li>
                                  {product.rating}  Estrelas ({product.numberReiews}) vistos
                                </li>
                                <li>
                                  Valor <b>R$ {product.price}</b>
                                </li>
                                <li>
                                  Descrição:
                                  <div>{product.description} </div>

                                </li>
                              </ul>
                            </div>
                            <div className="details-action">
                              <ul>
                                <li>
                                  Valor: {product.price}
                                </li>
                                <li>
                                  Status: {product.count > 0 ? "Em estoque" : "Sem estoque" }
                                </li>
                                <li> Quantidade:
                                    {product.count > 0 ?
                                        <select className="cart-select-qty" value={productsQty} onChange={(event) => {setProductsQty(event.target.value)}}>
                                            {[...Array(product.count).keys()].map( c =>
                                                <option key={c + 1} value={c + 1}>{c + 1}</option>
                                            )}
                                        </select> : " 0" }

                                </li>
                                <li>
                                    {product.count > 0 &&
                                        <button onClick={addToCart} className="button primary">
                                             Add ao carrinho
                                        </button>

                                    }

                                </li>
                              </ul>
                            </div>
                          </div>
                      )

            }



         </div>
}
export default ProductScreen;
