import React, { useEffect, useState } from 'react';
import './item.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from "motion/react";

export default function ItemContent() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
    const [selectedEdition, setSelectedEdition] = useState("0");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}/games/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setGame(data);
                setLoading(false);

                // не даем прогрузиться сваперу до прогрузки данных
                if (window.Swiper && data.screenshots && data.screenshots.length > 0) {
                    setTimeout(() => {
                        const swiper = new window.Swiper(".item-swiper", {
                            slidesPerView: 2,
                            freeMode: true,
                            breakpoints: {
                                450: { slidesPerView: 2.1, spaceBetween: 10 },
                                900: { slidesPerView: 3, spaceBetween: 10 },
                                1100: { slidesPerView: 3, spaceBetween: 10 },
                                1340: { slidesPerView: 2.2, spaceBetween: 10, },
                                1600: { slidesPerView: 2.2, spaceBetween: 15, },
                                1900: { slidesPerView: 2.1, spaceBetween: 30, }
                            },
                            spaceBetween: 10,
                        });
                    }, 100);
                }
            })
            .catch((err) => {
                console.error("Ошибка загрузки:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="item-page">
                <div className="loading">Загрузка...</div>
            </div>
        ); 
    }

    // создаем массив объектов страна-цена
    const countryPricePairs = game.countries.map((country, index) => ({
        country,
        price: game.prices[index]
    }));

    // получаем текущую цену на основе выбранной страны
    const currentPrice = countryPricePairs[selectedCountryIndex]?.price || '0';

    return (
        <motion.div className="item-page"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.08, ease: 'easeOut' }}
        >
            <main className="main">
                <div className="main__container container">
                    <Link to="/catalog">
                        <div className="main__back">
                            <img src="/img/row__button.svg" alt="" />
                            <div className="back__title">К каталогу игр</div>
                        </div>
                    </Link>

                    <div className="main__content">
                        <div className="content__galery">
                            <div className="galery__left">
                                <div className="galery__left-img">
                                    <img src={game.img} className="info__img" alt={game.name} />
                                </div>
                                <select
                                    className="galery__left-select"
                                    value={selectedCountryIndex}
                                    onChange={(e) => setSelectedCountryIndex(parseInt(e.target.value))}
                                >
                                    {countryPricePairs.map((item, index) => (
                                        <option key={index} value={index}>
                                            {item.country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="galery__right">
                                <p className="galery__right-title">{game.name}</p>

                                <ul className="galery__right-tags">
                                    {game.genres && game.genres.map((genre, index) => (
                                        <li key={index} className="tag">{genre}</li>
                                    ))}
                                </ul>
                                {game.screenshots && game.screenshots.length > 0 && (
                                    <div className="swiper mySwiper galery__right-slider item-swiper">
                                        <div className="swiper-wrapper">
                                            {game.screenshots.map((screenshot, index) => (
                                                <div key={index} className="swiper-slide">
                                                    <img
                                                        className="slider-img"
                                                        src={screenshot}
                                                        alt={`${game.name} скриншот ${index + 1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="galery__right-choose">
                                    <div className="choose__payment">

                                        <p className="payment__money">
                                            Цена: <span className="money">{currentPrice}₽</span>
                                            <br />
                                            Цена в Steam:<span className="money"> {game.steam_price || "Бесплатно"} </span>
                                        </p>
                                        <button
                                            className="payment__button"
                                            onClick={() => navigate('/orderPage', {
                                                state: {
                                                    type: 'game',
                                                    title: game.name,
                                                    price: currentPrice,
                                                    id: game.id
                                                }
                                            })}
                                        >
                                            Купить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content__text">
                            {(game.min_requirements || game.rec_requirements) && (
                                <div className="content__text-first">
                                    <div className="first__title">Системные требования</div>
                                    <div className="first__sys">
                                        {game.min_requirements && game.min_requirements !== 'Не указаны' && (
                                            <p className="sys__min width" dangerouslySetInnerHTML={{ __html: game.min_requirements }}></p>
                                        )}
                                        {game.rec_requirements && game.rec_requirements !== 'Не указаны' && (
                                            <p className="sys__rec width" dangerouslySetInnerHTML={{ __html: game.rec_requirements }}></p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {game.about_the_game && (
                                <div className="content__text-second">
                                    <p className="second__title">Описание</p>
                                    <div
                                        className="second__text"
                                        dangerouslySetInnerHTML={{ __html: game.about_the_game }}
                                    ></div>
                                </div>
                            )}

                            <div className="content__text-third">
                                <p className="third__title">Подробнее о покупке</p>
                                <p className="third__text">
                                    Вы приобретаете игру в Steam, которую получите ПОДАРКОМ на Ваш аккаунт. Это происходит автоматически 24\7 без
                                    праздников и выходных. Процесс получения гифта очень простой и занимает пару минут: После оплаты к вам в
                                    друзья Steam добавится бот. Пожалуйста, примите его в друзья, чтобы получить игру. После добавления, вам будет
                                    отправлен подарок в виде игры - нужно принять его. Игра у вас на аккаунте - можно играть.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
}