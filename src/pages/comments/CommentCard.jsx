const CommentCard = (comment) => {
    const { votes, created_at, author, body } = comment

    return (
        <div className="comment-card">
            <p>{body}</p>
            <div className="comment-footer">
                <p>{votes} votes</p>
                <p>by {author}</p>
                <p>created at {created_at}</p>
            </div>
        </div>
    )
}

export default CommentCard
