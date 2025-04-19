import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProblem, submitSolution, getSolutions } from '../../utils/api';
import { getComments, addComment } from '../../utils/api';
import { getCurrentUser } from '../../utils/auth';
import CommentForm from '../Comments/CommentForm';
import CommentList from '../Comments/CommentList';

function ProblemDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [solutions, setSolutions] = useState([]);
    const [solution, setSolution] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const currentUser = getCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [problemResponse, solutionsResponse, commentsResponse] = await Promise.all([
                    getProblem(id),
                    getSolutions(id),
                    getComments(id)
                ]);
                setProblem(problemResponse.data);
                setSolutions(solutionsResponse.data);
                setComments(commentsResponse.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch problem details');
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            navigate('/login');
            return;
        }

        try {
            await submitSolution(id, solution);
            setSolution('');
            // Refresh solutions
            const solutionsResponse = await getSolutions(id);
            setSolutions(solutionsResponse.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit solution');
        }
    };

    const handleCommentAdded = async () => {
        try {
            const response = await getComments(id);
            setComments(response.data);
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
    if (!problem) return <div className="text-center mt-8">Problem not found</div>;

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
            <div className="mb-4">
                <span className="text-gray-600">Posted by: {problem.author?.username || 'Anonymous'}</span>
                <span className="mx-2">•</span>
                <span className="text-gray-600">Difficulty: {problem.difficulty}</span>
            </div>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="whitespace-pre-wrap">{problem.description}</p>
            </div>

            {currentUser && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Submit Solution</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <textarea
                                value={solution}
                                onChange={(e) => setSolution(e.target.value)}
                                className="w-full h-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your solution here..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 btn btn-primary  py-2 px-4  hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit Solution
                        </button>
                    </form>
                </div>
            )}

            <div>
                <h2 className="text-xl font-semibold mb-4">Solutions</h2>
                {solutions.length > 0 ? (
                    <div className="space-y-4">
                        {solutions.map((solution) => (
                            <div key={solution._id} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">
                                        Submitted by: {solution.author?.username || 'Anonymous'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(solution.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                                    {solution.content}
                                </pre>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No solutions submitted yet.</p>
                )}
            </div>

                {/* Comments Section */}
                {currentUser && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Add Comments</h2>
                    <CommentForm problemId={id} onCommentAdded={handleCommentAdded} />
                    {/* <CommentList problemId={id} /> */}
                </div>
                )}
                
            <div>
                <h2 className="text-xl font-semibold mb-4 mt-4">Discussions</h2>
                {comments.length > 0 ? (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment._id} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">
                                        Submitted by: {comment.author?.username || 'Anonymous'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                                    {comment.content}
                                </pre>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No discussions yet.</p>
                )}
            </div>

        </div>
    );
}

export default ProblemDetail; 