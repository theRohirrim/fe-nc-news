import { useContext, useEffect, useState } from "react"
import { convertDateTime, deleteCommentByCommentId, enableEnterPress, updateVotes } from "../../components/utils/api"
import Error from "../../components/Error";

const CommentCard = ({comment, setComments}) => {
    const [err, setErr] = useState(null)
    // Logged in user emables deleting of comments they have made
    const currentUser = 'weegembump';
    const { comment_id, votes, created_at, author, body } = comment
    
    // Votes state for optimistic rendering
    let [currentVotes, setVotes] = useState(votes)
    // States to limit multiple clicks from the user
    const [upvoteClicked, setUpvoteClicked] = useState(false)
    const [downvoteClicked, setDownvoteClicked] = useState(false)

    useEffect(() => {        
        // Upon loading, set the state to the local storage value of vote buttons
        setUpvoteClicked(localStorage.getItem(`comment_${comment_id}_upvote_clicked`) === 'true')
        setDownvoteClicked(localStorage.getItem(`comment_${comment_id}_downvote_clicked`) === 'true')
    }, [])

    // useEffect to set the state of upvote and downvote clicks from local storage
    useEffect(() => {        
        // Upon change of state, store states in local storage
        localStorage.setItem(`comment_${comment_id}_upvote_clicked`, upvoteClicked)
        localStorage.setItem(`comment_${comment_id}_downvote_clicked`, downvoteClicked)
    }, [upvoteClicked, downvoteClicked])

    // Sadly have to repeat code as states are local and extracting to a utility
    // function would mean having to turn the states into contexts, which is not ideal
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
            updateVotes('comment', comment_id, voteChange)
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
            updateVotes('comment', comment_id, voteChange)
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

    const onDelete = (event) => {
        event.preventDefault();
        setErr(null)

        let fullComments;
        // Optimistically delete
        setComments((currentComments) => {
            fullComments = currentComments
            return currentComments.filter((comment) => {
                return comment.comment_id !== comment_id
            })
        })

        // Send API request in the background
        deleteCommentByCommentId(comment_id)
        .catch((err) => {
            // Reverse optimistic changes
            setComments(fullComments)


            setErr("Could not delete your comment at this time. Please try again later")
        })
    }

    // Enable buttons to be pressed with enter
    enableEnterPress();

    return (
        <div className="comment-card">
            {author === currentUser &&
            <div className="deleteButton">
                <button className="enter-press" onClick={onDelete}>Delete</button>
            </div>
            }
            <div className="comment-body">
                <p>{body}</p>
            </div>
            <div className="comment-footer">
                <div className="error-container">
                {err ? <Error message={err} /> : null}
                </div>
                <div className="votes-container">
                    <div className="vote-button-container">
                        <button id={`comment-${comment_id}-upvote-button`} onClick={handleVoteClick} className={`upvote-button enter-press ${upvoteClicked ? 'disabled-button' : ''}`}>+</button>
                        <button id={`comment-${comment_id}-downvote-button`} onClick={handleVoteClick} className={`downvote-button enter-press ${downvoteClicked ? 'disabled-button' : ''}`}>-</button>
                    </div>
                    <p>{currentVotes} votes</p>
                </div>
                <p>by {author} {convertDateTime(created_at)} {/\d/g.test(convertDateTime(created_at)) ? 'ago' : null}</p>
            </div>
        </div>
    )
}

export default CommentCard
