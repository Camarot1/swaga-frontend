import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, checkAdmin, getUserFromToken } from '../auth';
import './admin.scss';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAdmin = async () => {
            const adminStatus = await checkAdmin();
            setIsAdmin(adminStatus);
            if (!adminStatus) {
                navigate('/profile');
                return;
            }
            const user = getUserFromToken();
            setCurrentUser(user);
            fetchUsers();
        };
        verifyAdmin();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${process.env.REACT_APP_URL}/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id, login) => {
        if (!window.confirm(`Вы уверены, что хотите удалить пользователя "${login}"?`)) {
            return;
        }

        if (id === currentUser?.id) {
            alert('Нельзя удалить самого себя!');
            return;
        }

        try {
            const token = getToken();
            const response = await fetch(`${process.env.REACT_APP_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setUsers(users.filter(user => user.id !== id));
                alert('Пользователь успешно удален!');
            } else {
                alert('Ошибка при удалении пользователя');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Ошибка соединения с сервером');
        }
    };

    if (loading || isAdmin === null) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="admin-users-page">
            <main className="main">
                <div className="main__container container">
                    <div className="page-header">
                        <button className="back-btn" onClick={() => navigate('/admin')}>
                            Назад в админку
                        </button>
                        <h1>Управление пользователями</h1>
                        <p>Текущий админ: {currentUser?.login}</p>
                    </div>

                    <div className="content">
                        <h2>Список пользователей ({users.length})</h2>
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th className="table__text">ID</th>
                                    <th className="table__text">Логин</th>
                                    <th className="table__text">Админ</th>
                                    <th className="table__text">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} className={user.id === currentUser?.id ? 'current-user' : ''}>
                                        <td className="table__text">{user.id}</td>
                                        <td className="table__text">
                                            {user.login}
                                            {user.id === currentUser?.id && ' (Вы)'}
                                        </td>
                                        <td className="table__text">
                                            <span className={`admin-badge ${user.isAdmin ? 'admin-true' : 'admin-false'}`}>
                                                {user.isAdmin ? 'Да' : 'Нет'}
                                            </span>
                                        </td>
                                        <td className="table__text">
                                            <button
                                                className={`delete-btn ${user.id === currentUser?.id ? 'delete-disabled' : ''}`}
                                                onClick={() => handleDelete(user.id, user.login)}
                                                disabled={user.id === currentUser?.id}
                                                title={user.id === currentUser?.id ? 'Нельзя удалить себя' : 'Удалить пользователя'}
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