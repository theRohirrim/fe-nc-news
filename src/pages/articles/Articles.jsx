import { useEffect, useState } from "react"
import ArticleFilter from "./ArticleFilter"
import ArticleList from "./ArticleList"
import { useSearchParams } from "react-router-dom"
import { getArticles, getLastPage } from "../../components/utils/api"
import Pagination from "./Pagination"

const Articles = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentFilter, setFilter] = useState({})
    const [articles, setArticles] = useState([])

    useEffect(() => {
        setFilter((currentFilter) => {

            return {
                ...currentFilter,
                topic: searchParams.get('topic'),
                sort_by: searchParams.get('sort_by'),
                order: searchParams.get('order'),
                p: searchParams.get('p')
            }
        })
    }, [searchParams])

    useEffect(() => {
        getArticles(currentFilter)
        .then((res) => {    
            setArticles(res.articles)
        })
    }, [currentFilter])
    
    return (
        <main>
            <ArticleFilter searchParams={searchParams} setSearchParams={setSearchParams}/>
            <ArticleList articles={articles}/>
            <Pagination currentFilter={currentFilter} searchParams={searchParams} setSearchParams={setSearchParams}/>
        </main>
    )
}

export default Articles