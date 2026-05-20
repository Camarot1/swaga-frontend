import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken, isTokenExpired, logout, getToken } from '../auth';
import './profile.scss';

export default function Profile() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('')
    const [history, setHistory] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const user = getUserFromToken();
            if (isTokenExpired()) {
                logout()
                navigate('/login')
                return
            }
            if (!user) {
                logout();
                navigate('/login');
                return;
            }

            await fetchHistory()
            setLogin(user.login);
            setEmail(user.email)
            setLoading(false);
        }
        loadData()
    }, [navigate]);

    const fetchHistory = async () => {
        try {
            const token = getToken()
            const response = await fetch(`${process.env.REACT_APP_URL}/users/history`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            setHistory(data)
            setLoading(false)
        } catch (error) {
            console.error('Ошибка получения истории:', error)
            setLoading(false)
        }
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="profile-page">
            <main className="main">
                <div className="main__container container">
                    <div className="main__text">
                        <p className="text__info">Профиль</p>
                        <p className="text__name">{login}</p>
                        <div className="text__name">{email}</div>
                        <button
                            className="text__logout"
                            onClick={handleLogout}
                        >
                            Выйти
                        </button>
                    </div>
                    <div className="main__order">
                        <div className="order__buttons">
                            <button className="order__button relevant">Заказы</button>
                        </div>
                        <div className="order__list">
                            {history.map(item => (
                                <div className="list__item">
                                    <p className="item__title">{item.type}</p>
                                    <p className="item__money">{item.price}</p>
                                    <p className="item__money">{item.email}</p>
                                    <p className="item__money">{item.login}</p>
                                </div>
                            ))}
                            {/* <div className="list__item">
                                <p className="item__title">Название услуги</p>
                                <p className="item__money">1000 руб.</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}