import axios from 'axios';
import { getAuthToken } from './auth';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

//landing page
export const getLandingPage = () => api.get('/');

// Problems
export const getProblems = () => api.get('/problems');
export const getProblem = (id) => api.get(`/problems/${id}`);
export const createProblem = (data) => api.post('/problems', data);
export const voteProblem = (problemId, voteType) => api.post(`/problems/${problemId}/vote`, { voteType });

// Solutions
export const submitSolution = (problemId, content) => api.post('/solutions', {
    problemId,
    content,
    authorId: JSON.parse(localStorage.getItem('currentUser')).id
});
export const getSolutions = (problemId) => api.get(`/solutions/problem/${problemId}`);

// Leaderboard
export const getLeaderboard = () => api.get('/users/leaderboard');


// User Profile
export const getUserProfile = (userId) => api.get(`/users/${userId}`);
export const updateUserProfile = (userId, data) => api.put(`/users/${userId}`, data);

// Comments
export const getComments = (problemId) => api.get(`/comments/problem/${problemId}`);
export const addComment = (problemId, content) => api.post('/comments', {
    problemId,
    content,
    authorId: JSON.parse(localStorage.getItem('currentUser')).id
});
export const updateComment = (commentId, content) => api.put(`/comments/${commentId}`, { content });
export const deleteComment = (commentId) => api.delete(`/comments/${commentId}`);

export default api; 