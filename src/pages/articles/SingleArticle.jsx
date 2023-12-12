import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../../components/utils/api"
import ArticleCard from "./ArticleCard"
import CommentList from "../comments/CommentList"

const SingleArticle = () => {
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { article_id } = useParams()

    useEffect(() => {
        getArticleById(article_id).then((articleData) => {
          setArticle(articleData.article);
          setIsLoading(false)
        });
    }, []);


    if (isLoading) {
        return (
            <h1 className="loading">Loading...</h1>
        )
    }

    return (
        <>
        <ArticleCard article={article} linkActive={false}>
            <div className="article-body">
                <p>{article.body}</p>
            </div>
        </ArticleCard>
        <CommentList article_id={article_id}/>
        </>
    )

}

export default SingleArticle