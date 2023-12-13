import { useEffect, useState } from "react"
import { convertDateTime, updateVotes } from "../../components/utils/api"
import { Link } from "react-router-dom"

const ArticleCard = (props) => {
    const [err, setErr] = useState(null)
    // Votes state for optimistic rendering
    let [currentVotes, setVotes] = useState(props.article.votes)

    const { article_id, title, author, topic, created_at, votes, article_img_url, comment_count} = props.article
    
    // States to limit multiple clicks from the user
    const [upvoteClicked, setUpvoteClicked] = useState(false)
    const [downvoteClicked, setDownvoteClicked] = useState(false)

    useEffect(() => {        
        // Upon loading, set the state to the local storage value of vote buttons
        setUpvoteClicked(localStorage.getItem(`article_${article_id}_upvote_clicked`) === 'true')
        setDownvoteClicked(localStorage.getItem(`article_${article_id}_downvote_clicked`) === 'true')
    }, [])

    // useEffect to set the state of upvote and downvote clicks from local storage
    useEffect(() => {        
        // Upon change of state, store states in local storage
        localStorage.setItem(`article_${article_id}_upvote_clicked`, upvoteClicked)
        localStorage.setItem(`article_${article_id}_downvote_clicked`, downvoteClicked)
    }, [upvoteClicked, downvoteClicked])

    const handleVoteClick = (event) => {
        // Carry out changes to votes if button is not disabled
        if (!event.target.className.includes('disabled')) {
            let voteChange
            // If one is disabled and the other is not, double the vote change
            if (event.target.id.includes('upvote')) {
                voteChange = downvoteClicked ? 2 : 1
            } else {
                voteChange = upvoteClicked ? -2 : -1
            }
    
            // Update the UI optimistically
            setVotes((currentVotes) = currentVotes + voteChange)
            setErr(null);
    
            // Perform API request in background
            updateVotes('article', article_id, voteChange)
            .then(() => {
                // disable button via state upon successful change
                if (event.target.className.includes('upvote')) {
                    setUpvoteClicked(true)
                    //re-enable if other button was clicked
                    if (downvoteClicked) setDownvoteClicked(false)

                } else {
                    setDownvoteClicked(true)
                    //re-enable if other button was clicked
                    if (upvoteClicked) setUpvoteClicked(false)
                }
            })
            .catch((err) => {
                setVotes((currentVotes) = currentVotes - voteChange)
                setErr("Something went wrong, please try again")
            })
        } else {
            // Reverse the vote change if pressing the disabled button again
            const voteChange = event.target.id.includes('upvote') ? -1 : 1

            // Update the UI optimistically
            setVotes((currentVotes) = currentVotes + voteChange)
            setErr(null);

            // Perform API request in background
            updateVotes('article', article_id, voteChange)
            .then(() => {
                // Undo the disabling
                if (event.target.className.includes('upvote')) {
                    setUpvoteClicked(false)
                } else {
                    setDownvoteClicked(false)
                }
            })
            .catch((err) => {
                setVotes((currentVotes) = currentVotes - voteChange)
                setErr("Something went wrong, please try again")
            })
        }
    }

    return (
            <div className="article-card">
            <Link className={props.linkActive ? 'active-link' : 'disabled-link'}to={`/articles/${article_id}`}>
                <div className="article-card-header">
                    <h3>{title}</h3>
                    <p>by {author}</p>
                </div>
                <img src={article_img_url} />
            </Link>
            <div className="article-card-footer">
                <div className="votes-container">
                    <p>{currentVotes} votes</p>
                    {err ? <p>{err}</p> : null}
                    <button id={`article-${article_id}-upvote-button`} onClick={handleVoteClick} className={`upvote-button ${upvoteClicked ? 'disabled-button' : ''}`}>+</button>
                    <button id={`article-${article_id}-downvote-button`} onClick={handleVoteClick} className={`downvote-button ${downvoteClicked ? 'disabled-button' : ''}`}>-</button>
                </div>
                <p>{comment_count} comments</p>
                <p>created {convertDateTime(created_at)} ago</p>
            </div>
            {props.children}
        </div>
    )
}

export default ArticleCard