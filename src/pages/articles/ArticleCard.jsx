import { useState } from "react"
import { updateVotes } from "../../components/utils/api"

const ArticleCard = (props) => {
    const [article, setArticle] = useState(props.article)
    const [err, setErr] = useState(null)

    const {article_id, title, author, topic, created_at, votes, article_img_url, comment_count} = article
    // Votes state for optimistic rendering
    let [currentVotes, setVotes] = useState(votes)

    const handleVoteClick = (event) => {
        const voteChange = event.target.id.includes('upvote') ? 1 : -1

        // Update the UI optimistically
        setVotes((currentVotes) = currentVotes + voteChange)
        setErr(null);

        // Perform API request in background
        updateVotes(article_id, voteChange)
        .catch((err) => {
            setVotes((currentVotes) = currentVotes - voteChange)
            setErr("Something went wrong, please try again")
        })
    }

    return (
        <div className="article-card">
            <div className="article-card-header">
                <h3>{title}</h3>
                <p>by {author}</p>
            </div>
            <img src={article_img_url} />
            <div className="article-card-footer">
                <div className="votes-container">
                    <p>{currentVotes} votes</p>
                    {err ? <p>{err}</p> : null}
                    <button id={`article-${article_id}-upvote-button`} onClick={handleVoteClick} className="upvote-button">+</button>
                    <button id={`article-${article_id}-downvote-button`} onClick={handleVoteClick} className="downvote-button">-</button>
                </div>
                <p>{comment_count} comments</p>
                <p>created at {created_at}</p>
            </div>
            {props.children}
        </div>
    )
}

export default ArticleCard