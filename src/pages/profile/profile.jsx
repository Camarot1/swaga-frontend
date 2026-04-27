import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken, isTokenExpired, logout } from '../auth';
import './profile.scss';

export default function Profile() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = getUserFromToken();
        if (isTokenExpired()){
            logout()
            navigate('/login')
            return
        }
        if (!user) {
            logout();
            navigate('/login');
            return;
        }
        setLogin(user.login);
        setLoading(false);
    }, [navigate]);

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
                       
                        <button
                                className="text__logout"
                                onClick={handleLogout}
                            >
                                Выйти
                            </button>
                    </div>
                    <div className="main__order">
                        <div className="order__buttons">
                            <button className="order__button relevant">Активные</button>
                            <button className="order__button finished">Выполнено</button>
                        </div>
                        <div className="order__list">
                            <div className="list__item">
                                <p className="item__title">Название услуги</p>
                                <p className="item__money">1000 руб.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}