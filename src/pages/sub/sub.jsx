import React, { useEffect, useState } from 'react'
import './sub.scss'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react'

export default function SubContent() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [sub, setSub] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}/subs/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setSub(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Ошибка загрузки", err)
                setLoading(false)
            })
    }, [id])
    if (loading) {
        return <div>Загрузка...</div>
    }
    return (
        <motion.div className="sub-page"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.08, ease: 'easeOut' }}
        >

            <main className="main">
                <div className="main__container container">
                    <Link to="/catalogSub">
                        <div className="main__back">
                            <img src="../img/row__button.svg" alt="" />
                            <div className="back__title">К каталогу подписок</div>
                        </div></Link>
                    <div className="main__info">
                        <img src="../img/sub__img-big.svg" className="info__img" alt="" />
                        <div className="info__content">
                            <div className="content__title">Купить подписку <span className="content">{sub?.title}</span></div>
                            <div className="content__conditions">
                                {sub?.need_vpn !== null && (
                                    <p className="condition">
                                        {sub.need_vpn ? 'Нужен VPN' : 'Без VPN'}
                                    </p>
                                )}
                                {sub?.is_official !== null && (
                                    <p className="condition">
                                        {sub.is_official ? ' Официальные ключи' : 'Неофициальные ключи'}
                                    </p>
                                )}
                                {sub?.instant_delivery !== null && (
                                    <p className="condition">
                                        {sub.instant_delivery ? 'Моментальная доставка' : 'Доставка не моментальная'}
                                    </p>
                                )}
                                {sub?.no_account_transfer !== null && (
                                    <p className="condition">
                                        {sub.no_account_transfer ? 'Товар кодом' : ' С передачей аккаунта'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="main__content">
                        <div className="content__price">
                            <div className="price__block">
                                <div className="block__money">
                                    <p className="money__title">{sub?.title || "Название подписки"}</p>
                                    <p className="money__text">{sub?.priceNew}₽</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="content__button"
                            onClick={() => navigate('/orderPage', {
                                state: {
                                    type: 'sub',
                                    title: sub?.title,
                                    price: sub?.priceNew,
                                    id: sub?.id
                                }
                            })}
                        >
                            Купить
                        </div>

                        <div className="content__instructions">
                            <p className="instruction__title">Инструкиция</p>
                            <p className="instruction__text">1. Выберите желаемый товар</p>
                            <p className="instruction__text">2. Нажмите кнопку оплатить</p>
                            <p className="instruction__text">3. Следуйте инструкциям на открывшейся странице</p>
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
}