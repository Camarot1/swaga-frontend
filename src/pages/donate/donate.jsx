import React, { useState, useEffect } from 'react';
import './donate.scss';
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "motion/react"

export default function DonateContent() {
    const navigate = useNavigate();
    const [currency, setCurrency] = useState('₽');
    const [amount, setAmount] = useState('1000');
    const [promo, setPromo] = useState('');
    const [steamLogin, setSteamLogin] = useState('');
    const [activeSection, setActiveSection] = useState('instruction');
    const [finalAmount, setFinalAmount] = useState('1100₽');

    useEffect(() => {
        const numAmount = parseFloat(amount) || 0;
        const multiplier = promo ? 1.06 : 1.1;
        const result = Math.ceil(numAmount * multiplier);
        setFinalAmount(`${result}${currency}`);
    }, [amount, promo, currency]);

    const handlePayment = () => {
        if (!amount || !steamLogin) {
            alert('Заполните сумму и логин Steam');
            return;
        }

        navigate('/orderPage', {
            state: {
                type: 'donate',
                title: `Пополнение Steam на ${amount}${currency}`,
                price: finalAmount,
                steamLogin: steamLogin,
            }
        });
    };

    return (
        <motion.div className="donate-page"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.08, ease: 'easeOut' }}
        >
            <main className="main">
                <div className="main__container container">
                    <div className="main__top">
                        <img src="./img/donateImg.svg" alt="" className="top__img" />
                        <div className="top__block">
                            <p className="block__title">Пополните STEAM</p>
                            <p className="block__text">Выберите валюту</p>
                            <div className="block__button">
                                <button 
                                    className={`button button__changeMoney ${currency === '₽' ? 'active' : ''}`}
                                    onClick={() => setCurrency('₽')}
                                >₽ RUB</button>
                                <button 
                                    className={`button button__changeMoney ${currency === '₸' ? 'active' : ''}`}
                                    onClick={() => setCurrency('₸')}
                                >₸ KZT</button>
                                <button 
                                    className={`button button__changeMoney ${currency === '$' ? 'active' : ''}`}
                                    onClick={() => setCurrency('$')}
                                >$ USD</button>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="main__bottom">
                            <div className="bottom__info">
                                <div className="info__button">
                                    <p 
                                        className={`button__text ins ${activeSection === 'instruction' ? 'purple' : ''}`}
                                        onClick={() => setActiveSection('instruction')}
                                    >Инструкция</p>
                                    <p 
                                        className={`button__text faq ${activeSection === 'faq' ? 'purple' : ''}`}
                                        onClick={() => setActiveSection('faq')}
                                    >FAQ</p>
                                </div>
                                <div className="info__drop">
                                    {activeSection === 'instruction' && (
                                        <div className="drop__instruction ins">
                                            <p className="text">1. Введите свой логин STEAM <a href=""><span style={{ color: '#3C72FF' }}>(как найти логин STEAM)</span></a></p>
                                            <p className="text">2. Введите желаемую сумму пополнения</p>
                                            <p className="text">3. Введите при наличии промокод</p>
                                            <p className="text">4. Нажмите кнопку оплатить</p>
                                            <p className="text">5. Следуйте инструкциям на открывшейся странице</p>
                                        </div>
                                    )}
                                    {activeSection === 'faq' && (
                                        <div className="drop__faq">
                                            <p className="text">Какие страны можно пополнять</p>
                                            <p className="text">Пополнение нового аккаунта Steam</p>
                                            <p className="text">Ограничения и лимиты на пополнение</p>
                                            <p className="text">Какие регионы нельзя пополнить</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bottom__form">
                                <div className="block form__money">
                                    <div className="money__title">Введите сумму</div>
                                    <input 
                                        type="text" 
                                        className="input__money" 
                                        placeholder="1000" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                <div className="block form__login">
                                    <input 
                                        type="text" 
                                        className="input__login" 
                                        placeholder="Ваш логин Steam" 
                                        value={steamLogin}
                                        onChange={(e) => setSteamLogin(e.target.value)}
                                    />
                                </div>
                                <div className="block form__end">
                                    <div className="end__title">Итого : <span className="end__result">{finalAmount}</span></div>
                                    <div className="end__donate">Способ оплаты: <img src="./img/donate__try.svg" alt="" /></div>
                                </div>
                                <div className="block form__button" onClick={handlePayment}>
                                    Оплатить: {finalAmount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}