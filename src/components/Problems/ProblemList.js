import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VoteButton from '../Common/VoteButton';
import { getProblems, voteProblem } from '../../utils/api';

function ProblemList() {
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('latest');

    useEffect(() => {
        fetchProblems(filter);
    }, [filter]);

    const fetchProblems = async (filterType) => {
        try {
            const response = await getProblems();
            let filteredProblems = [...response.data];

            switch (filterType) {
                case 'popular':
                    filteredProblems.sort((a, b) => 
                        (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
                    );
                    break;
                case 'unsolved':
                    filteredProblems = filteredProblems.filter(p => p.solutionCount === 0);
                    break;
                case 'latest':
                default:
                    filteredProblems.sort((a, b) => 
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    break;
            }
            setProblems(filteredProblems);
        } catch (err) {
            setError('Failed to fetch problems');
            console.error('Error fetching problems:', err);
        }
    };

    const handleVote = async (problemId, voteType) => {
        try {
            await voteProblem(problemId, voteType);
            fetchProblems(filter);
        } catch (error) {
            console.error('Error voting:', error);
            setError('Failed to vote. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mt-4 mb-4">
                <h1 className="text-3xl font-bold">Latest Problems</h1>
                <Link to="/problems/new" className="text-gray-600 btn btn-primary mt-4 hover:text-black-600">
                    Post Problem
                </Link>
            </div>
            <div className="flex space-x-4 mb-5">
                <button
                    className={`btn ${filter === 'latest' ? 'bg-yellow-400' : 'btn-primary'}`}
                    onClick={() => setFilter('latest')}
                    data-name="filter-latest"
                >
                    Latest
                </button>
                <button
                    className={`btn ${filter === 'popular' ? 'bg-yellow-400' : 'btn-primary'}`}
                    onClick={() => setFilter('popular')}
                    data-name="filter-popular"
                >
                    Most Popular
                </button>
                <button
                    className={`btn ${filter === 'unsolved' ? 'bg-yellow-400' : 'btn-primary'}`}
                    onClick={() => setFilter('unsolved')}
                    data-name="filter-unsolved"
                >
                    Unsolved
                </button>
            </div>
            <div className="space-y-3">
                {problems.map((problem) => (
                    <div key={problem._id} className="bg-white p-4 problem-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex flex-col items-center mr-3">
                                    <VoteButton
                                        direction="up"
                                        count={problem.upvotes || 0}
                                        active={problem.userVote === 'up'}
                                        onClick={() => handleVote(problem._id, 'up')}
                                        aria-label="Upvote"
                                    />
                                    <VoteButton
                                        direction="down"
                                        count={problem.downvotes || 0}
                                        active={problem.userVote === 'down'}
                                        onClick={() => handleVote(problem._id, 'down')}
                                        aria-label="Downvote"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center">
                                        <h2 className="text-lg font-bold mr-2">{problem.title}</h2>
                                        {problem.language && (
                                            <span className="px-2 py-0.5 bg-gray-200 rounded text-sm">
                                                {problem.language}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{problem.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center text-sm text-gray-600 space-x-4">
                                <button 
                                    className="flex items-center text-blue-500 hover:underline"
                                    aria-label={`${problem.commentCount || 0} comments`}
                                >
                                    <i className="fas fa-comment mr-1"></i>
                                    {problem.commentCount || 0} comments
                                </button>
                                <span className="flex items-center">
                                    <i className="fas fa-check-circle mr-1"></i>
                                    {problem.solutionCount} solutions
                                </span>
                                <span className="text-gray-500">
                                    Posted by: {problem.isAnonymous ? 'Anonymous' : problem.author?.username || 'Unknown'}
                                </span>
                            </div>
                            <Link
                                to={`/problems/${problem._id}`}
                                className="bg-blue-500 btn btn-primary px-3 py-1.5 text-sm hover:bg-yellow-400 rounded"
                            >
                                View Problem
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProblemList; 