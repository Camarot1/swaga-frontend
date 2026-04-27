import React, { useEffect } from 'react'
import './rewiews.scss'
import { div } from 'motion/react-client'

export default function RewiewsContent() {
    return (
        <div className="rewiews-page" >
            <main className="main">
                <div className="main__container container">
                    <h1 className="main__title">
                        Отзывы о SWAGA
                    </h1>
                    <div className="main__block">
                        <div className="block__item">
                            <div className="item__top">
                                <p className="top__name">NAME</p>
                                <p className="top__date">31 июля, 15:03</p>
                            </div>
                            <div className="item__bott">
                                <img src="./img/likeSmall.svg" className="bott__img" alt="" />
                                <p className="bott__text">Все хорошо! Спасибо!</p>
                            </div>
                        </div>

                        <div className="block__item">
                            <div className="item__top">
                                <p className="top__name">NAME</p>
                                <p className="top__date">31 июля, 15:03</p>
                            </div>
                            <div className="item__bott">
                                <img src="./img/likeSmall.svg" className="bott__img" alt="" />
                                <p className="bott__text">Все хорошо! Спасибо!</p>
                            </div>
                        </div>

                        <div className="block__item">
                            <div className="item__top">
                                <p className="top__name">NAME</p>
                                <p className="top__date">31 июля, 15:03</p>
                            </div>
                            <div className="item__bott">
                                <img src="./img/dislikeSmall.svg" className="bott__img" alt="" />
                                <p className="bott__text">Я остался недоволен.</p>
                            </div>
                        </div>

                        <div className="block__item">
                            <div className="item__top">
                                <p className="top__name">NAME</p>
                                <p className="top__date">31 июля, 15:03</p>
                            </div>
                            <div className="item__bott">
                                <img src="./img/dislikeSmall.svg" className="bott__img" alt="" />
                                <p className="bott__text">Я остался недоволен.</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}

