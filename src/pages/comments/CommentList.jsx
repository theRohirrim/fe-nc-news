import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../../components/utils/api" 
import CommentCard from "./CommentCard"
import CommentForm from "./CommentForm"
import Error from "../../components/Error"

const CommentList = (props) => {
    const [comments, setComments] = useState([])
    const [err, setErr] = useState(null)
    const { article_id } = props

    useEffect(() => {
        getCommentsByArticleId(article_id)
        .then((commentsData) => {
            setComments(commentsData.comments)
        })
    }, [comments])

    return (
        <div id="comment-container">
            <CommentForm key="comment-form" article_id={article_id} setComments={setComments} setErr={setErr}/>
            {err ? <Error message={err} /> : null}
            {comments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} setComments={setComments} />
            })}
        </div>
    )
}

export default CommentList