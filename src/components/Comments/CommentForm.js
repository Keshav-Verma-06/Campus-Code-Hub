import React, { useState } from 'react';
import { addComment } from '../../utils/api';
import { getCurrentUser } from '../../utils/auth';

function CommentForm({ problemId, onCommentAdded }) {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const currentUser = getCurrentUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setError('Please login to comment');
            return;
        }

        try {
            await addComment(problemId, content);
            setContent('');
            setError('');
            if (onCommentAdded) {
                onCommentAdded();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit comment');
        }
    };

    return (
        <div className="mb-8">
            {/* <h3 className="text-lg font-semibold mb-4">Add a Comment</h3> */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your comment here..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 btn btn-primary px-4 py-2 hover:bg-yellow-400"
                >
                    Submit Comment
                </button>
            </form>
        </div>
    );
}

export default CommentForm; 