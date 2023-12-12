import { useEffect, useState } from "react"
import { getArticles } from "../../components/utils/api"
import ArticleCard from "./ArticleCard"
import { Link } from "react-router-dom"

const ArtcilesList = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getArticles({})
        .then((res) => {
            setArticles(res.articles)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    if (isLoading) {
        return (
            <h1 className="loading">Loading...</h1>
        )
    }
    
    return (
        <div className="article-container">
            {articles.map((article) => {
            return (
                    <ArticleCard key={article.article_id.toString()} article={article} linkActive={true}/>
            )
           })}
        </div>
    )
}

export default ArtcilesList