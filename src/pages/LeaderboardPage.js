import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../utils/api';

function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await getLeaderboard();
                setLeaderboard(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching leaderboard:', err);
                setError('Failed to fetch leaderboard');
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    );
    
    if (error) return (
        <div className="text-red-500 text-center mt-8 p-4 bg-red-50 rounded-lg">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto mt-6 p-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-lg p-6 shadow-lg">
                <h1 className="text-3xl font-bold text-white text-center">
                    <i className="fas fa-trophy mr-3 text-yellow-400"></i>
                    Leaderboard
                </h1>
            </div>
            
            <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider w-16">
                                    Rank
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Username
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Points
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Problems Solved
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {leaderboard.map((user, index) => (
                                <tr 
                                    key={user._id} 
                                    className={`hover:bg-blue-50 transition-colors duration-150 ease-in-out
                                        ${index < 3 ? 'bg-opacity-10' : ''}
                                        ${index === 0 ? 'bg-yellow-50' : ''}
                                        ${index === 1 ? 'bg-gray-50' : ''}
                                        ${index === 2 ? 'bg-orange-50' : ''}`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                                            ${index === 0 ? 'bg-yellow-400 text-white' : ''}
                                            ${index === 1 ? 'bg-gray-400 text-white' : ''}
                                            ${index === 2 ? 'bg-orange-400 text-white' : ''}
                                            ${index > 2 ? 'bg-blue-100 text-blue-800' : ''}
                                        `}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium text-gray-900">
                                                {user.username}
                                            </span>
                                            {index < 3 && (
                                                <i className={`ml-2 fas fa-crown 
                                                    ${index === 0 ? 'text-yellow-400' : ''}
                                                    ${index === 1 ? 'text-gray-400' : ''}
                                                    ${index === 2 ? 'text-orange-400' : ''}`}
                                                ></i>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 font-semibold">
                                            {user.points}
                                            <span className="ml-1 text-xs text-gray-500">pts</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {user.problemsSolved}
                                            <span className="ml-1 text-xs text-gray-500">solved</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LeaderboardPage; 