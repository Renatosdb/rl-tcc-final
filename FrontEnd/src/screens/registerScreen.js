import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {register} from "../actions/userActions";


function RegisterScreen(p){

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const userRegister = useSelector(state => state.userRegister);
    const {user, loading, error} = userRegister;

    const redirect = p.location.search ? p.location.search.split("=")[1] : '/';

    useEffect(() => {
        if(user)
            //voltar para onde estava
            p.history.push(redirect);
    }, [user]);

    const  submit = (e) =>{
        e.preventDefault();
        dispatch(register(name,email,password ))
    }


    return <div className="form">
        <form onSubmit={submit} >
            <ul className="form-container">
                <li>
                    <h2>Cadastro</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Nome
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                    </input>
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
                    <label htmlFor="rePassword">
                        Repetir senha
                    </label>
                    <input type="rePassword" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}>
                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">Cadastrar</button>
                </li>
                <li>
                    Já possui cadastro?
                    <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Retornar para tela de login</Link>

                </li>
            </ul>
        </form>
    </div>
}
export default RegisterScreen;
