import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, checkAdmin } from '../auth';
import './admin.scss';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAdmin = async () => {
            const adminStatus = await checkAdmin();
            setIsAdmin(adminStatus);
            if (!adminStatus) {
                navigate('/profile');
                return;
            }
            fetchOrders();
        };
        verifyAdmin();
    }, [navigate]);

    const fetchOrders = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${process.env.REACT_APP_URL}/order`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    if (loading || isAdmin === null) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="admin-orders-page">
            <main className="main">
                <div className="main__container container">
                    <div className="page-header">
                        <button className="back-btn" onClick={() => navigate('/admin')}>
                            Назад в админку
                        </button>
                        <h1 className="table__text">Управление заказами</h1>
                        <p className="table__text"> Всего заказов: {orders.length}</p>
                    </div>

                    <div className="content">
                        <h2 className="table__text">Список заказов</h2>
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th className="table__text">ID</th>
                                    <th className="table__text">Email</th>
                                    <th className="table__text">Логин</th>
                                    <th className="table__text">Цена</th>
                                    <th className="table__text">Категория</th>
                                    <th className="table__text">ID товара</th>
                                    <th className="table__text">Название товара</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td className="table__text">{order.id}</td>
                                        <td className="table__text">{order.email}</td>
                                        <td className="table__text">{order.login || '-'}</td>
                                        <td className="table__text">{order.price}₽</td>
                                        <td className="table__text">{order.type}</td>
                                        <td className="table__text">{order.idProduct}</td>
                                        <td className="table__text">{order.title}</td>
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