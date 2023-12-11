import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../../components/utils/api"
import CommentCard from "./CommentCard"

const CommentList = (prop) => {
    const [comments, setComments] = useState([])
    const { article_id } = prop

    useEffect(() => {
        getCommentsByArticleId(article_id)
        .then((commentsData) => {
            setComments(commentsData.comments)
        })
    }, [comments])

    return (
        <div id="comment-container">
            {comments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} />
            })}
        </div>
    )
}

export default CommentList