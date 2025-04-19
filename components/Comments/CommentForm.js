function CommentForm({ onSubmit, parentId = null }) {
    try {
        const [comment, setComment] = React.useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!comment.trim()) return;

            try {
                await onSubmit({ content: comment, parentId });
                setComment('');
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        };

        return (
            <form onSubmit={handleSubmit} className="mb-4" data-name="comment-form">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border-2 border-black rounded mb-2"
                    placeholder="Write a comment..."
                    rows="3"
                    data-name="comment-input"
                ></textarea>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!comment.trim()}
                    data-name="submit-comment"
                >
                    Submit
                </button>
            </form>
        );
    } catch (error) {
        console.error('CommentForm render error:', error);
        reportError(error);
        return null;
    }
}
