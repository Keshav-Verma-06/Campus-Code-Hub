const express = require('express');
const router = express.Router();
const Solution = require('../models/Solution');
const Problem = require('../models/Problem');
const User = require('../models/User');

// Submit solution
router.post('/', async (req, res) => {
    try {
        const { problemId, content, authorId } = req.body;

        const solution = new Solution({
            problem: problemId,
            author: authorId,
            content
        });

        await solution.save();

        // Update problem's solution count
        await Problem.findByIdAndUpdate(problemId, {
            $inc: { solutionCount: 1 }
        });

        // Update user's points and problemsSolved count
        await User.findByIdAndUpdate(authorId, {
            $inc: { points: 5, problemsSolved: 1 }
        });

        res.status(201).json(solution);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get solutions for a problem
router.get('/problem/:problemId', async (req, res) => {
    try {
        const solutions = await Solution.find({ problem: req.params.problemId })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.json(solutions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Vote on solution
router.post('/:id/vote', async (req, res) => {
    try {
        const { voteType } = req.body;
        const solution = await Solution.findById(req.params.id);

        if (!solution) {
            return res.status(404).json({ message: 'Solution not found' });
        }

        if (voteType === 'up') {
            solution.upvotes += 1;
        } else {
            solution.downvotes += 1;
        }

        await solution.save();
        res.json(solution);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 