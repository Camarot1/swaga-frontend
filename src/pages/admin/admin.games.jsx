import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.scss';

export default function AdminGames() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [steamId, setSteamId] = useState('');
    const [adding, setAdding] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/games`);
            const data = await response.json();
            setGames(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching games:', error);
            setLoading(false);
        }
    };

    const handleAddGame = async (e) => {
        e.preventDefault();
        
        if (!steamId) {
            setMessage('Введите Steam ID игры');
            return;
        }

        if (!/^\d+$/.test(steamId)) {
            setMessage('Steam ID должен содержать только цифры');
            return;
        }

        setAdding(true);
        setMessage('');

        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/games/save-game/${steamId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`Игра "${result.gameName}" успешно добавлена!`);
                setSteamId('');
                // Обновляем список игр
                fetchGames();
            } else {
                setMessage(`Ошибка: ${result.error}`);
            }
        } catch (error) {
            console.error('Error adding game:', error);
            setMessage('Ошибка соединения с сервером');
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Вы уверены, что хотите удалить игру "${title}"?`)) {
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/games/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setGames(games.filter(game => game.id !== id));
                alert('Игра успешно удалена!');
            } else {
                alert('Ошибка при удалении игры');
            }
        } catch (error) {
            console.error('Error deleting game:', error);
            alert('Ошибка соединения с сервером');
        }
    };

    // Проверка прав администратора
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
        return <div>Загрузка игр...</div>;
    }

    return (
        <div className="admin-games-page">
            <main className="main">
                <div className="main__container container">
                    <div className="page-header">
                        <button className="back-btn" onClick={() => navigate('/admin')}>
                            Назад в админку
                        </button>
                        <h1>Управление играми</h1>
                        <p>Всего игр: {games.length}</p>
                    </div>

                    {/* форма добавления игры */}
                    <div className="add-game-form">
                        <h2>Добавить игру из Steam</h2>
                        <form onSubmit={handleAddGame}>
                            <div className="form-group">
                                <label htmlFor="steamId">Steam App ID:</label>
                                <input
                                    type="text"
                                    id="steamId"
                                    className="form-input"
                                    value={steamId}
                                    onChange={(e) => setSteamId(e.target.value)}
                                    placeholder="Введите цифровой ID игры из Steam"
                                    disabled={adding}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="add-btn"
                                disabled={adding}
                            >
                                {adding ? 'Добавление...' : 'Добавить игру'}
                            </button>
                        </form>
                        
                        {message && (
                            <div className={`message ${message.includes('Ошибка') ? 'error' : 'success'}`}>
                                {message}
                            </div>
                        )}
                    </div>

                    <div className="content">
                        <h2>Список игр ({games.length})</h2>
                        <table className="games-table">
                            <thead>
                                <tr>
                                    <th className="table__text">ID</th>
                                    <th className="table__text">Название</th>
                                    <th className="table__text">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {games.map(game => (
                                    <tr key={game.id}>
                                        <td className="table__text">{game.id}</td>
                                        <td className="table__text">{game.title}</td>
                                        <td className="table__text">
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(game.id, game.title)}
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