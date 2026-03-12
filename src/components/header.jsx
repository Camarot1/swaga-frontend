import React from 'react';
import './header.scss';
export default function Header() {
  return (
    <header className="header">
      <div className="header__container container">
        <a href="/">
          <p className="header__name logo__name">СВАГА</p>
        </a>
        <div className="header__navigation">
          <a href="/catalogSub"><button className="navigation__button header__hide big2">Подписки</button></a>
          <input type="text" className="navigation__search header__hide" placeholder="поиск по товарам" />
          <a href="/catalog"><button className="navigation__button header__hide big">Игры</button></a>
          <a href="/login"><button className="navigation__button">Профиль</button></a>
        </div>
        <div className="header__burger">
          <div className="burger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}