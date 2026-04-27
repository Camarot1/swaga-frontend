import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, checkAdmin } from '../auth';
import './admin.scss';

export default function AdminPage() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAdmin = async () => {
            const adminStatus = await checkAdmin();
            setIsAdmin(adminStatus);
            if (!adminStatus) {
                navigate('/profile');
            }
            setLoading(false);
        };
        verifyAdmin();
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="admin-page">
            <main className="admin-page__main">
                <div className="admin-page__container">
                    <div className="admin-page__header">
                        <h1 className="admin-page__title table__text">Админ панель</h1>
                        <div className="admin-page__user-info">
                            <button
                                className="admin-page__logout-btn"
                                onClick={handleLogout}
                            >
                                Выйти
                            </button>
                        </div>
                    </div>

                    <div className="admin-page__navigation">
                        <h2 className="admin-page__nav-title table__text">Управление</h2>
                        <div className="admin-page__nav-buttons">
                            <button
                                className="admin-page__nav-btn"
                                onClick={() => navigate('/admin/subs')}
                            >
                                Подписки
                            </button>
                            <button
                                className="admin-page__nav-btn"
                                onClick={() => navigate('/admin/users')}
                            >
                                Пользователи
                            </button>
                            <button
                                className="admin-page__nav-btn"
                                onClick={() => navigate('/admin/games')}
                            >
                                Игры
                            </button>
                            <button
                                className="admin-page__nav-btn"
                                onClick={() => navigate('/admin/order')}
                            >
                                Заказы
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}