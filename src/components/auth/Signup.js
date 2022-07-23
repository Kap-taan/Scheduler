import React, { useState, useContext } from "react";
import AuthContext from "../../stores/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import classes from './Signup.module.css';

const Signup = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signup } = useContext(AuthContext);
    const navigation = useNavigate();

    const submitHandler = (e) => {
        setLoading(true);
        setError('');
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if(!email || !password || !confirmPassword || !name)
        {
            setLoading(false);
            return setError('Some field is empty');
        }

        if (password === confirmPassword) {
            signup(email, password).then(user => {
                console.log('Signup Successful');
                setLoading(false);
                navigation('/dashboard');
            }).catch(err => {
                setError('Signup Failed');
                console.log(err);
            });
        }

    }

    return (
        <div className={classes.login}>
            <div className={classes.login_main}>
                <h3 className={classes.animate_charcter}>Scheduler</h3>
                <h5>Signup</h5>
                <form onSubmit={submitHandler}>
                    {loading && <div className={classes.loading}>Loading...</div>}
                    {error && <div className={classes.error}>{error}</div>}
                    <input type="text" placeholder="Name" name="name" />
                    <input type="email" placeholder="E-Mail" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" />
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;