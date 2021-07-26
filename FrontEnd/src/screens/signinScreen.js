import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { auth, facebookAuthProvider } from '../firebase';
import { FacebookLoginButton } from 'react-social-login-buttons';
import {signin} from "../actions/userActions";


function SigninScreen(p){

    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userSignin = useSelector(state => state.userSignin);
    const {user, loading, error} = userSignin;


    const redirect = p.location.search ? p.location.search.split("=")[1] : '/';

    useEffect(() => {
        if(user)
            //voltar para onde estava
            p.history.push(redirect);

    }, [user]);


    const  submit = (e) =>{
        e.preventDefault();
        dispatch(signin(email,password ))
    }
    const signInWithFacebook = () => {
          auth.signInWithPopup(facebookAuthProvider)
              .then(() => {
                  window.location.assign("/");
              })
              .catch(error => {
                  console.error(error);
              })
      }

    return <div className="form">
        <form onSubmit={submit} >
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">Signin</button>
                </li>
                <li>
                    <h5>É novo por aqui?</h5>
                    <Link to="/register" className="button secondary  text-center  button-create-user-width">Criar sua conta</Link>
                    <FacebookLoginButton className="mt-3 mb-3" onClick={signInWithFacebook} />

                </li>
            </ul>
        </form>
    </div>
}
export default SigninScreen;
