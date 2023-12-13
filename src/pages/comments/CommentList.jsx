import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../../components/utils/api"
import CommentCard from "./CommentCard"

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
            {comments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} setComments={setComments} />
            })}
        </div>
    )
}

export default CommentList