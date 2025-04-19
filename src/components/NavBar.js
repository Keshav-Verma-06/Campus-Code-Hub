import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ currentUser, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                    <div className="imglogo"><img src= "https://image.shutterstock.com/image-vector/c-logo-white-background-260nw-1284236944.jpg"
                            onClick={() => onPageChange('home')}
                            data-name="logo" />
                        </div>
                        <Link to="/" className="text-2xl font-bold cursor-pointer">
                            Campus Code Hub
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {currentUser ? (
                            <>
                                <Link to="/landing" className="text-gray-600 hover:text-black-600">
                                    Home
                                </Link>
                                <Link to="/problems/new" className="text-gray-600 hover:text-black-600">
                                    Post Problem
                                </Link>
                                <Link to="/leaderboard" className="text-gray-600 hover:text-black-600">
                                    Leaderboard
                                </Link>
                                <Link to="/profile" className="text-gray-600 hover:text-black-600">
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-600 hover:text-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-blue-600">
                                    Login
                                </Link>
                                <Link to="/register" className="text-gray-600 hover:text-blue-600">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar; 