const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Problem = require('../models/Problem');

// Submit comment
router.post('/', async (req, res) => {
    try {
        const { problemId, content, authorId } = req.body;

        const comment = new Comment({
            problem: problemId,
            author: authorId,
            content
        });

        await comment.save();

        // Update problem's comment count
        await Problem.findByIdAndUpdate(problemId, {
            $inc: { commentCount: 1 }
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get comments for a problem
router.get('/problem/:problemId', async (req, res) => {
    try {
        const comments = await Comment.find({ problem: req.params.problemId })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Vote on comment
router.post('/:id/vote', async (req, res) => {
    try {
        const { voteType } = req.body;
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (voteType === 'up') {
            comment.upvotes += 1;
        } else {
            comment.downvotes += 1;
        }

        await comment.save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 