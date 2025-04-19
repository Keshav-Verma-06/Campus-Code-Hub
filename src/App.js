import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import ProblemList from './components/Problems/ProblemList';
import ProblemForm from './components/Problems/ProblemForm';
import ProblemDetail from './components/Problems/ProblemDetail';
import LeaderboardPage from './pages/LeaderboardPage';
import UserProfile from './components/Profile/UserProfile';
import LandingPage from './pages/LandingPage'; // Import the LandingPage component
import { getCurrentUser, getAuthToken } from './utils/auth';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const checkAuth = () => {
            const token = getAuthToken();
            const user = getCurrentUser();
            
            if (token && user) {
                setCurrentUser(user);
            } else {
                // Clear any invalid data
                localStorage.removeItem('currentUser');
                localStorage.removeItem('token');
                setCurrentUser(null);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-100">
                <NavBar currentUser={currentUser} onLogout={handleLogout} />
                <div className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<ProblemList />} /> {/* Keep ProblemList as the default route */}
                        <Route path="/landing" element={<LandingPage />} /> {/* Add a new route for LandingPage */}
                        <Route 
                            path="/login" 
                            element={currentUser ? <Navigate to="/" /> : <LoginForm setCurrentUser={setCurrentUser} />} 
                        />
                        <Route 
                            path="/register" 
                            element={currentUser ? <Navigate to="/" /> : <RegisterForm setCurrentUser={setCurrentUser} />} 
                        />
                        <Route 
                            path="/problems/new" 
                            element={currentUser ? <ProblemForm /> : <Navigate to="/login" />} 
                        />
                        <Route path="/problems/:id" element={<ProblemDetail />} />
                        <Route path="/leaderboard" element={<LeaderboardPage />} />
                        <Route 
                            path="/profile" 
                            element={currentUser ? <UserProfile /> : <Navigate to="/login" />} 
                        />
                    </Routes>
                </div>
                <footer className="bg-gray-800 text-white py-4 mt-8">
                    <div className="container mx-auto text-center">
                        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;