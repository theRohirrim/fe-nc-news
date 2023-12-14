import { useEffect, useState } from "react"
import ArticleFilter from "./ArticleFilter"
import ArtcileList from "./ArticleList"
import { useSearchParams } from "react-router-dom"
import { getArticles } from "../../components/utils/api"

const Articles = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentFilter, setFilter] = useState({})
    const [articles, setArticles] = useState([])

    useEffect(() => {
        if (searchParams.size !== 0) {
            setFilter((currentFilter) => {
                return {
                    ...currentFilter,
                    topic: searchParams.get('topic')
                }
            })
        } else {
            setFilter({})
        }
    }, [searchParams])

    useEffect(() => {
        getArticles(currentFilter)
        .then((res) => {
            setArticles(res.articles)
        })
    }, [currentFilter])


    console.log(searchParams)
    console.log(currentFilter)
    console.log('articles', articles)
    return (
        <main>
            <ArticleFilter currentFilter={currentFilter} setArticles={setArticles} searchParams={searchParams} setSearchParams={setSearchParams}/>
            <ArtcileList articles={articles}/>
        </main>
    )
}

export default Articles