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

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const user = localStorage.getItem('currentUser');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <NavBar currentUser={currentUser} onLogout={handleLogout} />
                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<ProblemList />} />
                        <Route path="/login" element={!currentUser ? <LoginForm /> : <Navigate to="/" />} />
                        <Route path="/register" element={!currentUser ? <RegisterForm /> : <Navigate to="/" />} />
                        <Route path="/problems/new" element={currentUser ? <ProblemForm /> : <Navigate to="/login" />} />
                        <Route path="/problems/:id" element={<ProblemDetail />} />
                        <Route path="/leaderboard" element={<LeaderboardPage />} />
                        <Route path="/profile" element={currentUser ? <UserProfile /> : <Navigate to="/login" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
