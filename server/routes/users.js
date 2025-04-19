const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const users = await User.find()
            .select('username points problemsSolved')
            .sort({ points: -1, problemsSolved: -1 })
            .limit(100);

        res.json(users);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user profile
router.get('/:userId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select('-password')
            .populate('problemsCreated', 'title')
            .populate('problemsSolved', 'title');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 