import React, { useEffect, useState } from 'react';
import './main.scss';
import { Link } from 'react-router-dom';

export default function MainContent() {
  const [poster, setPoster] = useState([])
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/poster`)
      .then((res) => res.json())
      .then((data) => setPoster(data))
      .catch((err) => console.error("Ошибка загрузки:", err))
  })
  useEffect(() => {
    if (window.Swiper) {
      const swiper = new window.Swiper(".main-swiper", {
        breakpoints: {
          450: { slidesPerView: 1.5 },
          800: { slidesPerView: 2.3 },
          1300: { slidesPerView: 3 },
          1600: { slidesPerView: 3.4 },
          1900: { slidesPerView: 4.4 },
        },
        spaceBetween: 1,
        speed: 400,
        autoplay: { delay: 1500 },
        loop: true,
      });
    }
  }, []);
  return (
    <div className="main-page">
      <main className="main">
        <div className="main__container container">
          <div className="main__slider">
            <p className="slider__title">Самые популярные товары</p>
            <div className="swiper mySwiper main-swiper">
              <div className="swiper-wrapper">
                {poster.map((card) => (
                  <div className="swiper-slide"><img src={card.poster} className="swiper-img" alt="" /></div>
                ))}
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div className="main__convert">
            <img className="convert__img" src="/img/steam.png" alt="" />
            <div className="convert__block">
              <p className="convert__title">Пополнение STEAM</p>
              <div className="convert__block">
                <div className="block__img"><img src="" alt="" /></div>
                <div className="block__input">
                  <div className="input__top input-box">
                    <p className="top__text input__title">Заплачу ₽</p>
                    <input type="text" className="input-output give" />
                  </div>
                  <div className="input__button">
                    <img src="/img/convert.svg" alt="" />
                  </div>
                  <div className="input__bott input-box">
                    <p className="input__title bot__text">Получу ₽</p>
                    <input type="text" className="top__input post input-output" />
                  </div>
                </div>
              </div>
              <a href="./donate">
                <button className="convert__button">Перейти к товару</button>
              </a>
            </div>
          </div>

          <div className="main__info">
            <div className="info__top">
              <a href="./catalogSub">
                <div className="top__first">
                  <p className="first__title">Покупка ключей активации</p>
                  <img className="first__img" src="/img/cardsImg.svg" alt="" />
                </div>
              </a>
              <div className="top__second">
                <div className="second__top">
                  <p className="top__title">Наши контакты</p>
                  <ul className="top__list">
                    <li className="el"><div className="li__block"><img className="block__img" src="/img/tg.svg" alt="" /><p className="block__text">TG</p></div></li>
                    <li className="el"><div className="li__block"><img className="block__img" src="/img/VK.svg" alt="" /><p className="block__text">ВК</p></div></li>
                    <li className="el"><div className="li__block"><img className="block__img" src="/img/dzen.svg" alt="" /><p className="block__text">DZEN</p></div></li>
                  </ul>
                </div>
                <a href="./rewiews">
                  <div className="second__bott">
                    <p className="bott__text">Отзывы</p>
                    <img className="bott__img" src="/img/arrow.svg" alt="" />
                  </div>
                </a>
              </div>
              <a href="./catalog">
                <div className="top__third">
                  <p className="third__text">Покупка игр из STEAM</p>
                  <img className="third__img" src="/img/buySteam.svg" alt="" />
                </div>
              </a>
            </div>
            <div className="info__bott">
              <div className="bott">
                <div className="bott__title">
                  <img className="title__img" src="/img/logo.svg" alt="" />
                  <p className="title__text">Присоединяйся к бонусной системе</p>
                </div>
                <p className="bott__text">Создавай аккаунт на нашем сайте и накапливай бонусы для скидок на покупки</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}