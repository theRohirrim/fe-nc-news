import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../../components/utils/api"
import CommentCard from "./CommentCard"
import CommentForm from "./CommentForm"

const CommentList = (props) => {
    const [comments, setComments] = useState([])
    const { article_id } = props

    useEffect(() => {
        getCommentsByArticleId(article_id)
        .then((commentsData) => {
            setComments(commentsData.comments)
        })
    }, [comments])

    return (
        <div id="comment-container">
            <CommentForm article_id={article_id} setComments={setComments}/>
            {comments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} />
            })}
        </div>
    )
}

export default CommentList