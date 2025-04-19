import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProblem } from '../../utils/api';

function ProblemForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                throw new Error('You must be logged in to create a problem');
            }

            const problemData = {
                title,
                description,
                difficulty,
                authorId: currentUser.id
            };

            await createProblem(problemData);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Problem</h2>
            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="w-full px-3 py-2 border rounded"
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border rounded"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="6"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulty">
                        Difficulty
                    </label>
                    <select
                        className="w-full px-3 py-2 border rounded"
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <button
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    type="submit"
                >
                    Create Problem
                </button>
            </form>
        </div>
    );
}

export default ProblemForm;
