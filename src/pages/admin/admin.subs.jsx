import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.scss'

export default function AdminSubs() {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState({
        img: '',
        title: '',
        priceNew: '',
        time: '',
        need_vpn: false,
        is_official: false,
        instant_delivery: false,
        no_account_transfer: false
    });

    useEffect(() => {
        fetchSubs();
    }, []);

    const fetchSubs = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/subs`);
            const data = await response.json();
            setSubs(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching subs:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Вы уверены, что хотите удалить подписку "${title}"?`)) {
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/subs/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setSubs(subs.filter(sub => sub.id !== id));
                alert('Подписка успешно удалена!');
            } else {
                alert('Ошибка при удалении подписки');
            }
        } catch (error) {
            console.error('Error deleting sub:', error);
            alert('Ошибка соединения с сервером');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/subs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newSub = await response.json();
                setSubs([...subs, newSub]);
                setFormData({
                    img: '',
                    title: '',
                    priceNew: '',
                    time: '',
                    need_vpn: false,
                    is_official: false,
                    instant_delivery: false,
                    no_account_transfer: false
                });
                setShowForm(false);
                alert('Подписка успешно добавлена!');
            } else {
                alert('Ошибка при добавлении подписки');
            }
        } catch (error) {
            console.error('Error adding sub:', error);
            alert('Ошибка соединения с сервером');
        }
    };

    if (!user || user.isAdmin !== 1) {
        return (
            <div className="admin-page">
                <div className="access-denied">
                    <h1>Доступ запрещен</h1>
                    <p>Требуются права администратора</p>
                    <button onClick={() => navigate('/login')}>Войти</button>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div>Загрузка подписок...</div>;
    }

    return (
        <div className="admin-subs-page">
            <main className="main">
                <div className="main__container container">
                    <div className="page-header">
                        <button className="back-btn" onClick={() => navigate('/admin')}>
                            Назад в админку
                        </button>
                        <h1>Управление подписками</h1>
                        <button 
                            className="add-btn"
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? 'Отмена' : 'Добавить подписку'}
                        </button>
                    </div>

                    {showForm && (
                        <div className="add-form">
                            <h2>Добавить новую подписку</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Изображение (URL):</label>
                                        <input
                                            type="text"
                                            name="img"
                                            className="form-color"
                                            value={formData.img}
                                            onChange={handleInputChange}
                                            placeholder="/img/catalogImg.svg"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Название:</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-color"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Цена:</label>
                                        <input
                                            type="text"
                                            name="priceNew"
                                            className="form-color"
                                            value={formData.priceNew}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Время:</label>
                                        <input
                                            type="text"
                                            name="time"
                                            className="form-color"
                                            value={formData.time}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="checkboxes">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="need_vpn"
                                            checked={formData.need_vpn}
                                            onChange={handleInputChange}
                                        />
                                        Требуется VPN
                                    </label>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="is_official"
                                            checked={formData.is_official}
                                            onChange={handleInputChange}
                                        />
                                        Официальная
                                    </label>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="instant_delivery"
                                            checked={formData.instant_delivery}
                                            onChange={handleInputChange}
                                        />
                                        Мгновенная доставка
                                    </label>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="no_account_transfer"
                                            checked={formData.no_account_transfer}
                                            onChange={handleInputChange}
                                        />
                                        Без передачи аккаунта
                                    </label>
                                </div>

                                <button type="submit" className="submit-btn">
                                    Добавить подписку
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="content">
                        <h2>Список подписок ({subs.length})</h2>
                        <table className="subs-table">
                            <thead>
                                <tr>
                                    <th className="table__text">ID</th>
                                    <th className="table__text">Название</th>
                                    <th className="table__text">Цена</th>
                                    <th className="table__text">Время</th>
                                    <th className="table__text">VPN</th>
                                    <th className="table__text">Официальная</th>
                                    <th className="table__text">Мгновенная доставка</th>
                                    <th className="table__text">Без передачи аккаунта</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subs.map(sub => (
                                    <tr key={sub.id}>
                                        <td className="table__text">{sub.id}</td>
                                        <td className="table__text">{sub.title}</td>
                                        <td className="table__text">{sub.priceNew}</td>
                                        <td className="table__text">{sub.time}</td>
                                        <td className="table__text">{sub.need_vpn ? '1' : '0'}</td>
                                        <td className="table__text">{sub.is_official ? '1' : '0'}</td>
                                        <td className="table__text">{sub.instant_delivery ? '1' : '0'}</td>
                                        <td className="table__text">{sub.no_account_transfer ? '1' : '0'}</td>
                                        <td className="table__text">
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(sub.id, sub.title)}
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}