
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCartById} from '../actions/cartActions';
import {Link} from 'react-router-dom';
function CartScreen(p){

  const productId = p.match.params.id;
  const productQty = p.location.search? Number(p.location.search.split("=")[1]):1;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart );
  const {cartItems} = cart;
  const removeFromCart = (id) =>{
    dispatch(removeFromCartById(id));
  }
  const cartCheckout = () =>{
    p.history.push("/signin?redirect=shipping");
  }

  useEffect(() => {
    if (productId)
      dispatch(addToCart(productId, productQty))
  }, []);

  return  <div className="cart">

    <div className="cart-list">

      <div className="back-to-result">
        <Link to="/"> Voltar </Link>
      </div>
      <ul className="cart-list-container">
        <li>
          <h3>Carrinho</h3>
          <div className="cart-text-value">Valor</div>
        </li>
        {

          cartItems.length === 0 ?
              <div> Carrinho Vazio</div>
              :
              cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img src={'../' + item.image} alt="product"/>
                    </div>

                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>
                      </div>
                      <div>
                        Quantidade:
                        <select className="cart-select-qty" value={item.productQty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                          {[...Array(item.count).keys()].map(x =>
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                          )}
                        </select>


                      </div>

                      <button type="button" className="button cart-button-delete" onClick={() => removeFromCart(item.product)} >
                        Remover
                      </button>
                    </div>
                    <div className="cart-price">
                      R$ {item.price}
                    </div>
                  </li>
              )
        }
      </ul>
    </div>
    <br/>
    <br/>
    <br/>
    <div className="cart-action">
      <h3>
        Total( {cartItems.reduce((x, y) => x + y.productQty, 0)} itens)
        :
        R$ {cartItems.reduce((x, y) => x +parseFloat(y.price) * y.productQty, 0)}
      </h3>
      <button className="button primary full-width" onClick={cartCheckout} disabled={cartItems.length === 0}>
        Finalizar compra
      </button>
    </div>
  </div>



}
export default CartScreen;
