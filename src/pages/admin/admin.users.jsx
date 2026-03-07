import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.scss';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/users`, {
                method: 'GET',
                headers: {
                'x-api-key': process.env.REACT_APP_AUTH_KEY
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

    // Не позволяем удалить самого себя
    if (id === currentUser.id) {
        alert('Нельзя удалить самого себя!');
        return;
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/users/${id}`, {
            method: 'DELETE',
            'x-api-key': process.env.REACT_APP_AUTH_KEY
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

// Проверка прав администратора
if (!currentUser || currentUser.isAdmin !== 1) {
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
    return <div>Загрузка пользователей...</div>;
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
                    <p>Текущий админ: {currentUser.login}</p>
                </div>

                <div className="content">
                    <h2>Список пользователей ({users.length})</h2>
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th className="table__text">ID</th>
                                <th className="table__text">Логин</th>
                                <th className="table__text">Пароль</th>
                                <th className="table__text">Админ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className={user.id === currentUser.id ? 'current-user' : ''}>
                                    <td className="table__text">{user.id}</td>
                                    <td className="table__text">
                                        {user.login}
                                        {user.id === currentUser.id && ' (Вы)'}
                                    </td>
                                    <td className="table__text">{user.password}</td>
                                    <td className="table__text">
                                        <span className={`admin-badge ${user.isAdmin ? 'admin-true' : 'admin-false'}`}>
                                            {user.isAdmin ? 'Да' : 'Нет'}
                                        </span>
                                    </td>
                                    <td className="table__text">
                                        <button
                                            className={`delete-btn ${user.id === currentUser.id ? 'delete-disabled' : ''}`}
                                            onClick={() => handleDelete(user.id, user.login)}
                                            disabled={user.id === currentUser.id}
                                            title={user.id === currentUser.id ? 'Нельзя удалить себя' : 'Удалить пользователя'}
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