import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"

const ArticleList = ({articles}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [reRender, setReRender] = useState(true)

    useEffect(() => {
        if (articles) setIsLoading(false)
        setReRender(!reRender)
    }, [articles])

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

export default ArticleList