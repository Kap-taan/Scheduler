import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../stores/AuthContext';
import classes from './Login.module.css';

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);

    const navigation = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const email = e.target.email.value;
        const password = e.target.password.value;
        if(!email || !password)
        {
            setLoading(false);
            return setError('Some field is empty');
        }
        
        login(email, password).then(user => {
            console.log("Logged In Successfully");
            navigation('/dashboard');
        }).catch(err => {
            setError('Cannot Logged in :(');
            console.log(err);
        })

    }

    return (
        <div className={classes.login}>
            <div className={classes.login_main}>
                <h3 className={classes.animate_charcter}>Scheduler</h3>
                <h5>Login</h5>
                <form onSubmit={submitHandler}>
                    {loading && <div className={classes.loading}>Loading...</div>}
                    {error && <div className={classes.error}>{error}</div>}
                    
                    <input type="email" placeholder="E-Mail" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button type="submit">Login</button>
                </form>
                <p className={classes.link}>Want to <Link to="/signup"> Signup</Link></p>
            </div>
        </div>
    );
}

export default Login;