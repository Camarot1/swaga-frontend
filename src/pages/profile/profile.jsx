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

    const [reviewText, setReviewText] = useState('');
    const [reviewReaction, setReviewReaction] = useState(null);
    const [submitting, setSubmitting] = useState(false);

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
        } catch (error) {
            console.error('Ошибка получения истории:', error)
        }
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        
        if (!reviewText.trim()) {
            alert('Пожалуйста, введите текст отзыва');
            return;
        }
        
        if (reviewReaction === null) {
            alert('Пожалуйста, выберите реакцию');
            return;
        }

        setSubmitting(true);
        
        try {
            const token = getToken();
            const response = await fetch(`${process.env.REACT_APP_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    login: login,
                    reviewsText: reviewText,
                    reviewsPoint: reviewReaction
                })
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Отзыв успешно добавлен!');
                setReviewText('');
                setReviewReaction(null);
            } else {
                alert('Ошибка при добавлении отзыва');
            }
        } catch (error) {
            console.error('Ошибка отправки отзыва:', error);
            alert('Ошибка при отправке отзыва');
        } finally {
            setSubmitting(false);
        }
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
                                <div className="list__item" key={item.id}>
                                    <p className="item__title">{item.type}</p>
                                    <p className="item__money">{item.price}₽</p>
                                    <p className="item__money">{item.email}</p>
                                    <p className="item__money">{item.login}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="main__review-form">
                        <h2 className="review-form__title">Оставить отзыв</h2>
                        <form onSubmit={handleSubmitReview}>
                            <textarea
                                className="review-form__textarea"
                                placeholder="Напишите ваш отзыв..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                maxLength={50}
                                rows={3}
                            />
                            <p className="review-form__counter">{reviewText.length}/50</p>
                            
                            <div className="review-form__reactions">
                                <button
                                    type="button"
                                    className={`reaction-btn ${reviewReaction === true ? 'active' : ''}`}
                                    onClick={() => setReviewReaction(true)}
                                >
                                    👍 Рекомендую
                                </button>
                                <button
                                    type="button"
                                    className={`reaction-btn ${reviewReaction === false ? 'active' : ''}`}
                                    onClick={() => setReviewReaction(false)}
                                >
                                    👎 Не рекомендую
                                </button>
                            </div>
                            
                            <button
                                type="submit"
                                className="review-form__submit"
                                disabled={submitting}
                            >
                                {submitting ? 'Отправка...' : 'Отправить отзыв'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}