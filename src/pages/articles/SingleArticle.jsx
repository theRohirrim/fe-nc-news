import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../../components/utils/api"
import ArticleCard from "./ArticleCard"
import CommentList from "../comments/CommentList"

const SingleArticle = () => {
    const [article, setArticle] = useState({})
    const { article_id } = useParams()

    useEffect(() => {
        getArticleById(article_id).then((articleData) => {
          setArticle(articleData.article);
        });
    }, [article]);

    return (
        <>
        <ArticleCard article={article} />
        <CommentList article_id={article_id}/>
        </>
    )

}

export default SingleArticle