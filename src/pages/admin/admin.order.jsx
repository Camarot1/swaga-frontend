import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}/order`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_AUTH_KEY
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);

    return (
        <div>
            <div className="page-header">
                <Link to="/admin">
                    <button className="back-btn">
                        Назад в админку
                    </button>
                </Link>
            </div>
            <h2>Заказы ({orders.length})</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Логин</th>
                        <th>Цена</th>
                        <th>Категория</th>
                        <th>ID товара</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.email}</td>
                            <td>{order.login || '-'}</td>
                            <td>{order.price}₽</td>
                            <td>{order.type}</td>
                            <td>{order.idProduct}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}