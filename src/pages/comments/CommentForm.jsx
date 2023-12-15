import { useContext, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { postCommentByArticleId } from "../../components/utils/api"

const CommentForm = (props) => {
    const [input, setInput] = useState("")
    const { article_id, setComments, setErr } = props
    const {currentUser} = useContext(UserContext)

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleCollapsible = (event) => {
        event.preventDefault()
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErr(null)
        // Attempt post if input is not empty
        if (input) {
            // Build comment
            const comment = {
                article_id: article_id,
                author: currentUser,
                body: input,
                created_at: 'Now',
                votes: 0
            }
    
    
            // Render optimistically
            setComments((currentComments) => {
                return [comment, ...currentComments]
            })

            // Clear input
            setInput('')
    
            // Send api request in the background
            postCommentByArticleId(input, article_id, currentUser)
            .catch((err) => {
                setErr('Could not post your comment at this time, please try again later')
                //Undo optimistic changes if error occurs
                setComments((currentComments) => {
                    currentComments.shift()
                    return currentComments
                })
            })
        } else {
            // Alert user with an error they cannot post an empty comment
            setErr("Cannot post an empty comment")
        }
    }

    // Allow user to press enter on the collapsible and cancel buttons
    const keypressButtons = [].slice.call(document.getElementsByClassName('enter-press'))
    // Apply event listener when buttons have loaded
    if (keypressButtons.length !== 0) {
        keypressButtons.forEach((button) => {
            button.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                  event.preventDefault();
                  button.click();
                  console.log('Clicked')
                }
              });
        })
    }

    return (
        <form id="comment-form-container" onSubmit={handleSubmit}>
            <textarea id="comment-body-input"
            placeholder="Type your comment here..."
            onChange={handleChange}
            value={input} />
            <div className="form-button-container">
                <button className="cancel-button enter-press" onClick={handleCollapsible}>Cancel</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default CommentForm