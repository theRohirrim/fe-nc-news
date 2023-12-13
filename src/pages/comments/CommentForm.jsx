import { useState } from "react"

const CommentForm = (props) => {
    const [input, setInput] = useState("")
    const { article_id, setComments } = props

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <form id="comment-form-container">
            <div className="collapsible-button">
                <button>Add Comment -</button>
            </div>
            <input type="text" id="comment-body-input"
            placeholder="Type your comment here..."
            onChange={handleChange}
            value={input} />
            <div className="form-button-container">
                <button>Cancel</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default CommentForm