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


    const [openFaqIndex, setOpenFaqIndex] = useState(null)
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

    const faqData = [
        {
            question: 'Какие страны можно пополнять',
            answer:' Пополнить можно все страны СНГ, все страны Евросоюза'
        },
        {
            question:'Пополнение нового аккаунта Steam',
            answer:'Перед пополнением запустите любую бесплатную игру на 5 минут, после можете спокойно пополнить свой аккаунт'
        },
        {
            question:'Ограничения и лимиты на пополнение',
            answer:'В день не получится пополнить аккаунт Steam более чем на 100 000₽'
        },
        {
            question:'Какие регионы нельзя пополнить',
            answer:'Не получится пополнить аккаунты созданные на территории: Республики Крым, Донецкой Народной Республики, Луганской народной республики'
        }
    ]

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
                                            <p className="text">3. Нажмите кнопку оплатить</p>
                                            <p className="text">4. Следуйте инструкциям на открывшейся странице</p>
                                        </div>
                                    )}
                                    {activeSection === 'faq' && (
                                        <div className="drop__faq">
                                            {faqData.map((item, index) =>(
                                                <div key={index} className="faq-item">
                                                    <p className="text question"
                                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                                    >
                                                        {item.question}
                                                    </p>
                                                    {openFaqIndex == index && (
                                                        <div className="faq-answer">
                                                            <p className="answer-text">{item.answer}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
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
                                    <div className="end__donate">Способ оплаты: <img className="end__donate" src="./img/donate__try.svg" alt="" /></div>
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