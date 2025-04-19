import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProblems } from '../../utils/api';
import ProblemCard from './ProblemCard';

function ProblemList() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('recent');

    useEffect(() => {
        const loadProblems = async () => {
            try {
                setLoading(true);
                const data = await fetchProblems({ filter });
                setProblems(data);
            } catch (error) {
                setError('Failed to load problems');
                console.error('Error loading problems:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProblems();
    }, [filter]);

    if (loading) {
        return <div className="text-center py-8">Loading problems...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Problems</h1>
                <div className="flex space-x-4">
                    <button
                        className={`px-4 py-2 rounded ${
                            filter === 'recent'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setFilter('recent')}
                    >
                        Recent
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            filter === 'popular'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setFilter('popular')}
                    >
                        Popular
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            filter === 'unsolved'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setFilter('unsolved')}
                    >
                        Unsolved
                    </button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {problems.map((problem) => (
                    <Link to={`/problems/${problem._id}`} key={problem._id}>
                        <ProblemCard problem={problem} />
                    </Link>
                ))}
            </div>

            {problems.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No problems found. Be the first to create one!
                </div>
            )}
        </div>
    );
}

export default ProblemList;
