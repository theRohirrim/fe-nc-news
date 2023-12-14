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
        setFilter((currentFilter) => {
            // Default the sort by and order
            return {
                ...currentFilter,
                topic: searchParams.get('topic'),
                sort_by: searchParams.get('sort_by'),
                order: searchParams.get('order')
            }
        })

        // Copy existing queries to avoid mutation, and set search parameters
        const newParams = new URLSearchParams(searchParams);
        // Set the topic query
        newParams.set('sort_by', 'created_at');
        newParams.set('order', 'asc');
        setSearchParams(newParams);  
    }, [searchParams])

    useEffect(() => {
        getArticles(currentFilter)
        .then((res) => {
            setArticles(res.articles)
        })
    }, [currentFilter])

    return (
        <main>
            <ArticleFilter currentFilter={currentFilter} searchParams={searchParams} setSearchParams={setSearchParams}/>
            <ArtcileList articles={articles}/>
        </main>
    )
}

export default Articles