import React from 'react'
import { useState, useEffect } from 'react'
import { useSignup } from '../hooks/useSignup.jsx';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext.jsx';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();
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

        await signup(email, password);
        navigate('/');

    }

    return (
        <form action="" method='POST' onSubmit={handleSubmit} className='signup'>
            <h3>Sign up</h3>

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

            <button type="submit" disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup