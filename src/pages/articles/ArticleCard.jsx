const ArticleCard = (props) => {
    const {title, author, topic, created_at, votes, article_img_url, comment_count} = props.article
    return (
        <div className="article-card">
            <div className="article-card-header">
                <h3>{title}</h3>
                <p>by {author}</p>
            </div>
            <img src={article_img_url} />
            <div className="article-card-footer">
                <p>{votes} votes</p>
                <p>{comment_count} comments</p>
                <p>created at {created_at}</p>
            </div>
            {props.children}
        </div>
    )
}

export default ArticleCard