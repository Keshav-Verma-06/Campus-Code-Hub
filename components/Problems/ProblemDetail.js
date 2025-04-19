import { API_ENDPOINT } from '../../utils/api';

// Define submitSolution function directly in this file to avoid import issues
async function submitSolution(problemId, solution) {
    const USE_API = false; // This should match the value in utils/api.js
    
    if (USE_API) {
        try {
            const response = await fetch(`${API_ENDPOINT}/problems/${problemId}/solutions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ solution }),
            });
            if (!response.ok) throw new Error('Failed to submit solution');
            return await response.json();
        } catch (error) {
            console.error('Error submitting solution:', error);
            throw error;
        }
    } else {
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
            const problems = JSON.parse(localStorage.getItem('problems') || '[]');
            const problemIndex = problems.findIndex(p => p.id === problemId);
            
            if (problemIndex === -1) throw new Error('Problem not found');
            
            // Update the problem's solution count
            problems[problemIndex].solutionCount = (problems[problemIndex].solutionCount || 0) + 1;
            
            // Store the solution
            const solutions = JSON.parse(localStorage.getItem(`solutions_${problemId}`) || '[]');
            solutions.push({
                id: '_' + Math.random().toString(36).substr(2, 9),
                content: solution,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem(`solutions_${problemId}`, JSON.stringify(solutions));
            localStorage.setItem('problems', JSON.stringify(problems));
            
            return { success: true };
        } catch (error) {
            console.error('Error submitting solution:', error);
            throw error;
        }
    }
}

// Define submitComment function directly in this file to avoid import issues
async function submitComment(problemId, commentData) {
    const USE_API = false; // This should match the value in utils/api.js
    
    if (USE_API) {
        try {
            const response = await fetch(`${API_ENDPOINT}/problems/${problemId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(commentData),
            });
            if (!response.ok) throw new Error('Failed to submit comment');
            return await response.json();
        } catch (error) {
            console.error('Error submitting comment:', error);
            throw error;
        }
    } else {
        try {
            await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
            
            // Get existing comments
            const comments = JSON.parse(localStorage.getItem(`comments_${problemId}`) || '[]');
            
            // Create new comment
            const newComment = {
                id: '_' + Math.random().toString(36).substr(2, 9),
                ...commentData,
                createdAt: new Date().toISOString(),
                upvotes: 0,
                downvotes: 0
            };
            
            // Add to comments array
            comments.push(newComment);
            
            // Save back to localStorage
            localStorage.setItem(`comments_${problemId}`, JSON.stringify(comments));
            
            // Update problem comment count
            const problems = JSON.parse(localStorage.getItem('problems') || '[]');
            const problemIndex = problems.findIndex(p => p.id === problemId);
            
            if (problemIndex !== -1) {
                problems[problemIndex].commentCount = (problems[problemIndex].commentCount || 0) + 1;
                localStorage.setItem('problems', JSON.stringify(problems));
            }
            
            return newComment;
        } catch (error) {
            console.error('Error submitting comment:', error);
            throw error;
        }
    }
}

function ProblemDetail({ problem }) {
    const [solution, setSolution] = React.useState('');
    const [comments, setComments] = React.useState([]);
    const [loadingComments, setLoadingComments] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [solutionSubmitted, setSolutionSubmitted] = React.useState(false);
    const [commentSubmitted, setCommentSubmitted] = React.useState(false);

    React.useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoadingComments(true);
                setError(null);
                
                // Check if we're using the API or localStorage
                const USE_API = false; // This should match the value in utils/api.js
                
                if (USE_API) {
                    const response = await fetch(`${API_ENDPOINT}/problems/${problem.id}/comments`);
                    const data = await response.json();
                    setComments(data);
                } else {
                    // Use localStorage instead
                    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
                    const storedComments = JSON.parse(localStorage.getItem(`comments_${problem.id}`) || '[]');
                    setComments(storedComments);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError('Failed to load comments');
                // Set empty comments array on error
                setComments([]);
            } finally {
                setLoadingComments(false);
            }
        };

        fetchComments();
    }, [problem.id, commentSubmitted]);

    const handleSubmitSolution = async () => {
        try {
            setError(null);
            await submitSolution(problem.id, solution);
            setSolution(''); // Clear solution after successful submission
            setSolutionSubmitted(prev => !prev); // Toggle to trigger refresh
            // Optionally refresh comments or show success message
        } catch (error) {
            console.error('Error submitting solution:', error);
            setError('Failed to submit solution');
        }
    };

    const handleCommentSubmit = async (newComment) => {
        try {
            const comment = await submitComment(problem.id, newComment);
            setComments(prevComments => [...prevComments, comment]);
            setCommentSubmitted(prev => !prev); // Toggle to trigger refresh
        } catch (error) {
            console.error('Error submitting comment:', error);
            setError('Failed to submit comment');
        }
    };

    const handleCommentVote = (commentId, voteType) => {
        // Implement voting logic here
        // Could update comments state with new vote counts
    };

    return (
        <div className="card" data-name="problem-detail">
            <h2 className="text-2xl font-bold mb-4">{problem.title || 'Untitled Problem'}</h2>
            
            <div className="mb-6">
                <h3 className="font-bold mb-2">Problem Description</h3>
                <p className="mb-4">{problem.description || 'No description available'}</p>
                {problem.codeSnippet && (
                    <CodeEditor
                        code={problem.codeSnippet}
                        readOnly={true}
                        language={problem.language || 'javascript'}
                    />
                )}
            </div>

            <div className="mb-6">
                <h3 className="font-bold mb-2">Your Solution</h3>
                <CodeEditor
                    code={solution}
                    onChange={setSolution}
                    language={problem.language || 'javascript'}
                />
                <button
                    className="btn btn-primary mt-4"
                    onClick={handleSubmitSolution}
                    data-name="submit-solution"
                    disabled={!solution.trim()} // Disable if solution is empty
                >
                    Submit Solution
                </button>
            </div>

            <div className="mb-6">
                <h3 className="font-bold mb-2">Submitted Solutions</h3>
                <SolutionsList problemId={problem.id} key={solutionSubmitted} />
            </div>

            <div>
                <h3 className="font-bold mb-4">Discussion</h3>
                <CommentForm onSubmit={handleCommentSubmit} />
                
                {loadingComments ? (
                    <div className="flex justify-center items-center h-32">
                        <i className="fas fa-spinner fa-spin text-2xl"></i>
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                ) : (
                    <CommentList
                        comments={comments}
                        onVote={handleCommentVote}
                        onReply={(commentId) => {
                            // Implement reply functionality
                            console.log(`Reply to comment ${commentId}`);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

// SolutionsList component to display submitted solutions
function SolutionsList({ problemId }) {
    const [solutions, setSolutions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchSolutions = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Get solutions from localStorage
                const storedSolutions = JSON.parse(localStorage.getItem(`solutions_${problemId}`) || '[]');
                setSolutions(storedSolutions);
            } catch (error) {
                console.error('Error fetching solutions:', error);
                setError('Failed to load solutions');
                setSolutions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSolutions();
    }, [problemId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-16">
                <i className="fas fa-spinner fa-spin text-xl"></i>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (solutions.length === 0) {
        return <p className="text-gray-500">No solutions submitted yet. Be the first to solve this problem!</p>;
    }

    return (
        <div className="space-y-4">
            {solutions.map(solution => (
                <div key={solution.id} className="border border-gray-200 rounded p-4">
                    <div className="mb-2">
                        <span className="text-sm text-gray-500">
                            Submitted on {new Date(solution.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <CodeEditor
                        code={solution.content}
                        readOnly={true}
                        language="javascript"
                    />
                </div>
            ))}
        </div>
    );
}