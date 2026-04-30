import React from 'react';
import './footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__info">
          <div className="footer__contact">
            <p className="contact__title title">Связь с нами</p>
            <ul className="contact__list footer__list">
              <a href=""><li className="footer__el"><img src="/img/telegram2.svg" className="el__img" alt="" /><p className="el__text">Поддержка покупателей</p></li></a>
              <a href=""><li className="footer__el"><img src="/img/telegram2.svg" className="el__img" alt="" /><p className="el__text">Сотрудничество</p></li></a>
            </ul>
          </div>
          <div className="footer__about">
            <p className="about__title title">Покупателям</p>
            <ul className="about__list footer__list">
              <li className="footer__el"><a href="#"><p className="el__text">Часто задаваемые вопросы</p></a></li>
              <li className="footer__el"><a href="#"><p className="el__text">Публичная оферта</p></a></li>
            </ul>
          </div>
        </div>
        <div className="footer__logo">
          <a href="/">
            <p className="logo__name">СВАГА</p>
          </a>
          <p className="logo__date">2026</p>


          <div className="steam-attribution-compact">
            <span>Данные о играх предоставлены </span>
            <a
              href="https://store.steampowered.com/login/"
              target="_blank"
              rel="noopener noreferrer"
              className="steam-link"
            >
              Steam
            </a>
            <a href="https://store.steampowered.com/login/"><img src="https://community.fastly.steamstatic.com/public/images/signinthroughsteam/sits_01.png" width="180" height="35" border="0"></img></a>
          </div>
        </div>
      </div>
    </footer>
  );
}