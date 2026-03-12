import React, { useState, useEffect } from 'react';
import './cookie.css';

const Сookie = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <p>
          Мы используем файлы cookie, чтобы улучшить вашу работу с сайтом. 
          Продолжая использовать сайт, вы соглашаетесь с этим.
        </p>
        <button onClick={acceptCookies} className="cookie-button">
          Принять
        </button>
      </div>
    </div>
  );
};

export default Сookie;