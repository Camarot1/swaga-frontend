import React, { useState } from 'react';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
            alert('Регистрация успешна');
            navigate('/login');
        } else {
            setError(data.message);
        }
    } catch (error) {
        setError('Ошибка сервера');
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="register-page">
            <main className="main">
                <div className="main__container container">
                    <form className="main__form" onSubmit={handleSubmit}>
                        <p className="form__title">Регистрация</p>

                        {error && <div className="error-message">{error}</div>}

                        <div className="form__block">
                            <p className="block__text">Логин</p>
                            <input 
                                type="text" 
                                className="block__input" 
                                name="login"
                                value={formData.login}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form__block">
                            <p className="block__text">Пароль</p>
                            <input 
                                type="password" 
                                className="block__input" 
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form__block">
                            <p className="block__text">Повторите пароль</p>
                            <input 
                                type="password" 
                                className="block__input" 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="form__profile"
                            disabled={loading}
                        >
                            {loading ? 'Регистрация...' : 'Регистрация'}
                        </button>

                        <div className="form__login-link">
                            Уже есть аккаунт? <span className="span"> <Link to="/login">Войти</Link></span>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}