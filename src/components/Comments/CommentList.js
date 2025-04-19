import React, { useState, useEffect } from 'react';
import { getComments } from '../../utils/api';

function CommentList({ problemId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getComments(problemId);
                setComments(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch comments');
                setLoading(false);
            }
        };

        fetchComments();
    }, [problemId]);

    if (loading) return <div className="text-center">Loading comments...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="space-y-4">
            {comments.length === 0 ? (
                <p className="text-gray-500 text-center">No comments yet</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment._id} className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-2">
                            <span className="font-semibold text-gray-800">
                                {comment.author?.username || 'Anonymous'}
                            </span>
                            <span className="text-gray-500 text-sm ml-2">
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default CommentList; 