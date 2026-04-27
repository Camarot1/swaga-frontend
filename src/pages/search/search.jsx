import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import "./search.scss"
export default function SearchPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''

    const [results, setResults] = useState({
        subsQ: [],
        gamesQ: []
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        if (!query) return
        setLoading(true)
        fetch(`${process.env.REACT_APP_URL}/api/search?q=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => setResults(data))
            .finally(() => setLoading(false))
    }, [query])

    if (loading) return <div className="loading">Загрузка...</div>
    return (
        <div className="search-page">
            <div className="main__container container">
                <div className="main__title">Результаты по запросу {query}</div>
                <div className="blocks">
                <div className="main__subs block">
                        <div className="subs__title block__title">Подписки</div>
                        <div className="subs__cards block__cards">
                            {results.subsQ.map(item => (
                                <div key={item.id} className="card">
                                    <Link to={`/sub/${item.id}`}>
                                    <img className="card__img" src={item.img} alt="" />
                                    <div className="card__text">{item.title}</div>
                                    <div className="card__text">{item.priceNew}₽</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="main__games block">
                        <div className="games__title block__title">Игры</div>
                        <div className="subs__cards block__cards">
                            {results.gamesQ.map(item => (
                                <div key={item.id} className="card">
                                    <Link to= {`/item/${item.id}`}>
                                    <img className="card__img" src={item.img} alt="" />
                                    <div className="card__text">{item.name}</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
