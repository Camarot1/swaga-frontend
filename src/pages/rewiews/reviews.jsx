import React, { useEffect, useState } from 'react'
import './reviews.scss'

export default function ReviewsContent() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState (true)

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_URL}/reviews`)
        .then((res) => res.json())
        .then((data) => {
            setReviews(data)
            setLoading(false)
        })
        .catch((err) => {
            console.error("Ошибка загрузки:", err)
            setLoading(false)
        })
    }, [])

if (loading){
    return <div>Загрузка...</div>
}

    return (
        <div className="rewiews-page" >
            <main className="main">
                <div className="main__container container">
                    <h1 className="main__title">
                        Отзывы о SWAGA
                    </h1>
                    <div className="main__block">
                        {reviews.map((review) =>(
                            <div className="block__item" key={review.id}>
                            <div className="item__top">
                                <p className="top__name">{review.login}</p>
                                {/* <p className="top__date">{review.created_at}</p> */}
                            </div>
                            <div className="item__bott">
                                <p className="bott__text">{review.reviewsPoint ? '👍' : '👎'}</p>
                                <p className="bott__text">{review.reviewsPoint ? "Рекомендую" : "Не рекомендую"}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

