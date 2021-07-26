import React, {useEffect, useState} from 'react';
import './App.css';
import HomeScreen from './screens/homeScreen';
import ProductScreen from './screens/productScreen';
import CartScreen from './screens/cartScreen';
import SigninScreen from './screens/signinScreen';
import {useSelector, useDispatch} from "react-redux";
import {BrowserRouter, Route, Link } from 'react-router-dom'
import { auth } from "./firebase";
import { useStateValue } from "./stateProvider";
import RegisterScreen from "./screens/registerScreen";

function App() {
  const userSignin = useSelector(state => state.userSignin )
  const {user} = userSignin;
  const dispatch = useDispatch();
  // const [{ user }, ] = useStateValue();
  //
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const {user}  = authUser
        // dispatch({
        //   type: "SET_USER",
        //   user: authUser
        // });
      } else {

        // dispatch({
        //   type: "SET_USER",
        //   user: null
        // });
      }
    });

    return () => {
      unsubscribe();
    }

  }, []);

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button type="button" onClick={openMenu} name="button">
              &#9776;
            </button>
            <Link to ="/"> APICE estudio</Link>

          </div>
          <div className="header-links">

            {
              user ? <Link to="/perfil">{user.name}</Link>  :  <Link to="/signin"><a>Sign In</a></Link>
            }
            <Link to="/cart"><a>Carrinho</a></Link>
          </div>

        </header>
        <aside className="sidebar">
          <h3>Categorias</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
            <li>
              <a href="index.html">Brincos</a>
            </li>
            <li>
              <a href="index.html">Colares</a>
            </li>
            <li>
              <a href="index.html">Anéis</a>
            </li>
          </ul>
        </aside>
          <main className="main">
            <div className="content">
              <Route path = "/signin"                 component = {SigninScreen} />
              <Route path = "/register"               component = {RegisterScreen} />
              <Route path = "/product/:id"            component = {ProductScreen} />
              <Route path = "/cart/:id?"              component = {CartScreen} />
              <Route path = "/" exact = {true}        component = {HomeScreen} />
            </div>
          </main>
          <footer className="footer">
            Todos os direitos reservados
          </footer>
      </div>
    </BrowserRouter>


  );
}

export default App;
