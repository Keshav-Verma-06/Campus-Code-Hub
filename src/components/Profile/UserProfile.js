import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../../utils/api';
import { getCurrentUser } from '../../utils/auth';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentUser = getCurrentUser();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!currentUser) {
                setError('You must be logged in to view your profile');
                setLoading(false);
                return;
            }

            try {
                const response = await getUserProfile(currentUser.id);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError('Failed to fetch user profile');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [currentUser]);

    if (loading)
        return <div className="text-center mt-8 text-lg font-semibold">Loading...</div>;
    if (error)
        return (
            <div className="text-red-500 text-center mt-8 text-lg font-bold">
                {error}
            </div>
        );
    if (!user)
        return (
            <div className="text-center mt-8 text-lg font-semibold">
                User not found
            </div>
        );

    const rewards = [
        {
            id: 1,
            brand: 'Adidas',
            item: 'Socks',
            points: 100,
            image:
                'https://th.bing.com/th/id/OIP.NwODrPeYTWMGbG1Tmg_g0wHaHa?w=193&h=192&c=7&r=0&o=5&dpr=1.2&pid=1.7',
        },
        {
            id: 2,
            brand: 'Puma',
            item: 'T-Shirt',
            points: 500,
            image:
                'https://www.dmsports.fr/48875-large_default/t-shirt-puma-power-colorblock-tee-noir-blanc.jpg',
        },
        {
            id: 3,
            brand: 'H&M',
            item: 'Hoodie',
            points: 1000,
            image:
                'https://i.pinimg.com/736x/49/bd/61/49bd617eade8b1813de434d6154a79d9.jpg',
        },
    ];

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            {/* User Profile */}
            <div className="flex items-center mb-8 bg-blue-500 rounded-lg p-4 text-white shadow-md">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold">
                        {user.username.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div className="ml-6">
                    <h1 className="text-3xl font-bold">{user.username}</h1>
                    <p className="text-gray-200">{user.email}</p>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-md">
                <h2 className="text-xl font-bold mb-4">Statistics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white text-center p-4 rounded-lg shadow-sm">
                        <span className="text-gray-600">Points:</span>
                        <span className="ml-2 font-bold text-lg">{user.points}</span>
                    </div>
                    <div className="bg-white text-center p-4 rounded-lg shadow-sm">
                        <span className="text-gray-600">Problems Solved:</span>
                        <span className="ml-2 font-bold text-lg">
                            {user.problemsSolved}
                        </span>
                    </div>
                    <div className="bg-white text-center p-4 rounded-lg shadow-sm">
                        <span className="text-gray-600">Problems Created:</span>
                        <span className="ml-2 font-bold text-lg">
                            {user.problemsCreated}
                        </span>
                    </div>
                </div>
            </div>

            {/* Rewards Section */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Rewards Store</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {rewards.map((reward) => (
                        <div
                            key={reward.id}
                            className="relative rounded-lg shadow-sm overflow-hidden hover:bg-yellow-400 transition-colors duration-300"
                        >
                            <img
                                src={reward.image}
                                alt={reward.item}
                                className="object-cover w-full h-40"
                            />
                            <div className="p-4 bg-white">
                                <h3 className="font-bold text-lg text-gray-800">
                                    {reward.brand}
                                </h3>
                                <p className="text-gray-600">{reward.item}</p>
                                <p className="text-lg font-bold text-green-600 mt-2">
                                    {reward.points} Points
                                </p>
                                <button className="btn btn-primary hover:bg-yellow-400 text-white rounded-lg w-full mt-4 py-2">
                                    Redeem
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;