import React from 'react'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserContext } from '../hooks/useUserContext.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, isLoading, error } = useLogin();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        await login(email, password);
        navigate('/');
    }

    return (
        <form action="" method='POST' onSubmit={handleSubmit} className='login'>
            <h3>Login</h3>

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" onClick={handleSubmit} disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login