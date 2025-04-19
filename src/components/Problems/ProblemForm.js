import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProblem } from '../../utils/api';
import { getCurrentUser } from '../../utils/auth';

function ProblemForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [codeSnippet, setCodeSnippet] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [difficulty, setDifficulty] = useState('medium');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const currentUser = getCurrentUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!currentUser) {
                throw new Error('You must be logged in to create a problem');
            }

            const problemData = {
                title,
                description,
                difficulty,
                codeSnippet,
                language,
                isAnonymous,
                author: currentUser.id
            };
            await createProblem(problemData);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const getDifficultyColor = (level) => {
        switch (level) {
            case 'easy': return 'text-green-600';
            case 'medium': return 'text-yellow-600';
            case 'hard': return 'text-red-600';
            default: return '';
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 mb-8">
            <div className="bg-blue-500 rounded-t-lg p-6">
                <h2 className="text-2xl font-bold text-white text-center">
                    Create New Problem
                </h2>
            </div>
            
            <div className="bg-white rounded-b-lg shadow-lg p-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
                        <div className="flex items-center">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {error}
                        </div>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Problem Title
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a descriptive title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Problem Description
                        </label>
                        <textarea
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="6"
                            placeholder="Describe the problem in detail..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codeSnippet">
                            Initial Code Snippet
                        </label>
                        <textarea
                            className="w-full px-4 py-2 border rounded font-mono bg-gray-50 focus:outline-none focus:border-blue-500"
                            id="codeSnippet"
                            value={codeSnippet}
                            onChange={(e) => setCodeSnippet(e.target.value)}
                            rows="8"
                            placeholder="// Add your starter code here..."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
                                Programming Language
                            </label>
                            <select
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                id="language"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                required
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="c++">C++</option>
                                <option value="c#">C#</option>
                                <option value="ruby">Ruby</option>
                                <option value="php">PHP</option>
                                <option value="swift">Swift</option>
                                <option value="kotlin">Kotlin</option>
                                <option value="go">Go</option>
                                <option value="rust">Rust</option>
                                <option value="typescript">TypeScript</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulty">
                                Difficulty Level
                            </label>
                            <select
                                className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${getDifficultyColor(difficulty)}`}
                                id="difficulty"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                required
                            >
                                <option value="easy" className="text-green-600">Easy</option>
                                <option value="medium" className="text-yellow-600">Medium</option>
                                <option value="hard" className="text-red-600">Hard</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                            />
                            <span className="text-gray-700 text-sm font-bold">Post Anonymously</span>
                        </label>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="btn btn-primary px-6 py-2 hover:bg-yellow-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary px-6 py-2 bg-blue-500 text-white hover:bg-yellow-400"
                        >
                            Create Problem
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProblemForm; 