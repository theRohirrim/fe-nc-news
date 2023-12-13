import { useEffect, useState } from "react"
import ArticleFilter from "./ArticleFilter"
import ArtcileList from "./ArticleList"
import { useSearchParams } from "react-router-dom"
import { getArticles } from "../../components/utils/api"

const Articles = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentFilter, setFilter] = useState({
        topic: searchParams.get('topic')
    })
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticles(currentFilter)
        .then((res) => {
            setArticles(res.articles)
        })
    }, [searchParams])

    console.log(articles)

    return (
        <main>
            <ArticleFilter currentFilter={currentFilter} setArticles={setArticles} searchParams={searchParams} setSearchParams={setSearchParams}/>
            <ArtcileList articles={articles}/>
        </main>
    )
}

export default Articles