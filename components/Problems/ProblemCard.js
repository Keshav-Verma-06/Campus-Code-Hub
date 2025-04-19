import React from 'react';
import { Link } from 'react-router-dom';
import { voteProblem } from '../../utils/api';

function ProblemCard({ problem }) {
    const handleVote = async (e, voteType) => {
        e.preventDefault();
        try {
            await voteProblem(problem._id, voteType);
            // The list will refresh automatically due to the filter state change
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                        Posted by {problem.author.username}
                    </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                    problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {problem.difficulty}
                </span>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3">{problem.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex space-x-4">
                    <button
                        onClick={(e) => handleVote(e, 'up')}
                        className="flex items-center space-x-1 hover:text-blue-500"
                    >
                        <i className="fas fa-thumbs-up"></i>
                        <span>{problem.upvotes}</span>
                    </button>
                    <button
                        onClick={(e) => handleVote(e, 'down')}
                        className="flex items-center space-x-1 hover:text-red-500"
                    >
                        <i className="fas fa-thumbs-down"></i>
                        <span>{problem.downvotes}</span>
                    </button>
                </div>
                <div className="flex space-x-4">
                    <span className="flex items-center space-x-1">
                        <i className="fas fa-comment"></i>
                        <span>{problem.commentCount}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <i className="fas fa-code"></i>
                        <span>{problem.solutionCount}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProblemCard;