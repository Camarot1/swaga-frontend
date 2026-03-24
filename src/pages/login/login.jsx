import React, { useState } from 'react';
import './login.scss';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password }),
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate(data.user.isAdmin ? '/admin' : '/profile');
        } else {
            setError(data.message);
        }
    } catch (error) {
        setError('Ошибка соединения с сервером');
    }
};

    return (
        <div className="login-page">
            <main className="main">
                <div className="main__container container">
                    <form className="main__form" onSubmit={handleSubmit}>
                        <p className="form__title">Вход</p>
                        {error && <div className="form__error">{error}</div>}
                        <input 
                            type="text" 
                            placeholder="login" 
                            className="form__login form__input" 
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="password" 
                            className="form__password form__input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="form__button">Вход</button>
                        <div className="form__register"><Link to="/register">Регистрация</Link></div>
                    </form>
                </div>
            </main>
        </div>
    );
}