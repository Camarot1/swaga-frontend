import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuthHeaders } from '../api';
import "./orderPage.scss"

export default function OrderPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [orderData, setOrderData] = useState(null);
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state) {
            setOrderData(location.state);
            if (location.state.steamLogin) {
                setLogin(location.state.steamLogin);
            }
        } else {
            navigate('/');
        }
    }, [location, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/order`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    title: orderData.title,
                    email: email,
                    login: login,
                    type: orderData.type,
                    price: orderData.price,
                    idProduct: orderData.id
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Заказ оформлен!');
                navigate('/');
            } else {
                alert(`Ошибка: ${result.error}`);
            }

        } catch (error) {
            alert('Ошибка соединения');
        } finally {
            setLoading(false);
        }
    };

    if (!orderData) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="order-page">
            <div className="container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Назад
                </button>

                <h1>Оформление заказа</h1>

                <div className="order-item">
                    <h3>{orderData.title}</h3>
                    <p>Цена: {orderData.price}₽</p>
                </div>

                <form onSubmit={handleSubmit} className="order-form">
                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    {(orderData.type === 'game' || orderData.type === 'donate') && (
                        <div className="form-group">
                            <label>
                                {orderData.type === 'game' ? 'Steam логин *' : 'Steam логин для пополнения *'}
                            </label>
                            <input
                                type="text"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="Ваш Steam логин"
                                required
                            />
                        </div>
                    )}


                    <div className="order-total">
                        Итого: {orderData.price}
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? 'Оформление...' : 'Подтвердить заказ'}
                    </button>
                </form>
            </div>
        </div>
    );
}