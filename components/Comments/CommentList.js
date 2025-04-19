function CommentList({ comments, onVote, onReply }) {
    try {
        const renderComment = (comment) => (
            <div key={comment.id} className="mb-4" data-name="comment-item">
                <div className="flex items-start mb-2">
                    <img
                        src={comment.author?.avatar || 'https://source.unsplash.com/40x40/?avatar'}
                        alt={comment.author?.name || 'Anonymous'}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex-grow">
                        <div className="flex items-center mb-1">
                            <h4 className="font-bold mr-2">{comment.author?.name || 'Anonymous'}</h4>
                            <span className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="mb-2">{comment.content}</p>
                        <div className="flex items-center space-x-4">
                            <VoteButton
                                direction="up"
                                count={comment.upvotes || 0}
                                active={comment.userVote === 'up'}
                                onClick={() => onVote(comment.id, 'up')}
                            />
                            <VoteButton
                                direction="down"
                                count={comment.downvotes || 0}
                                active={comment.userVote === 'down'}
                                onClick={() => onVote(comment.id, 'down')}
                            />
                            <button
                                className="text-sm text-gray-600 hover:text-gray-900"
                                onClick={() => onReply(comment.id)}
                                data-name="reply-button"
                            >
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
                {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-12">
                        {comment.replies.map(renderComment)}
                    </div>
                )}
            </div>
        );

        return (
            <div className="mt-6" data-name="comment-list">
                {comments.map(renderComment)}
            </div>
        );
    } catch (error) {
        console.error('CommentList render error:', error);
        reportError(error);
        return null;
    }
}
