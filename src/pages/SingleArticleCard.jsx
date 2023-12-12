import ArticleCard from "./articles/ArticleCard"

const SingleArticleCard = (prop) => {
    const { article } = prop

    return (
        <div className="single-article-card">
            <ArticleCard>
                <div className="article-body">
                    <p>{article.body}</p>
                </div>
            </ArticleCard>
        </div>
    )
}

export default SingleArticleCard