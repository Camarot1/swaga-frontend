import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.scss';
export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <header className="header">
      <div className="header__container container">
        <a href="/">
          <p className="header__name logo__name">СВАГА</p>
        </a>
        <div className="header__navigation">
          <a href="/catalogSub">
            <button className="navigation__button header__hide big2">Подписки</button>
          </a>
          {/* Поиск */}
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="text" 
              className="navigation__search header__hide"  placeholder="поиск по товарам"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <a href="/catalog">
            <button className="navigation__button header__hide big">Игры</button>
          </a>
          <a href="/profile">
            <button className="navigation__button">Профиль</button>
          </a>
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