const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const User = require('../models/User');

// Get all problems
router.get('/', async (req, res) => {
    try {
        const { filter } = req.query;
        let problems = await Problem.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        if (filter === 'popular') {
            problems.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        } else if (filter === 'unsolved') {
            problems = problems.filter(p => p.solutionCount === 0);
        }

        res.json(problems);
    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create problem
router.post('/', async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const { title, description, difficulty, codeSnippet, language, isAnonymous, author } = req.body;

        // Log each field to check if they're undefined
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Difficulty:', difficulty);
        console.log('Code Snippet:', codeSnippet);
        console.log('Language:', language);
        console.log('Author:', author);

        if (!title || !description || !difficulty || !codeSnippet || !author) {
            const missingFields = {
                title: !title,
                description: !description,
                difficulty: !difficulty,
                codeSnippet: !codeSnippet,
                author: !author
            };
            console.log('Missing fields:', missingFields);
            return res.status(400).json({ 
                message: 'Missing required fields',
                missing: missingFields
            });
        }

        const problem = new Problem({
            title,
            description,
            difficulty,
            codeSnippet,
            language,
            isAnonymous,
            author
        });

        console.log('Creating problem with data:', problem);

        await problem.save();

        // Update user's problemsCreated count
        await User.findByIdAndUpdate(author, {
            $inc: { problemsCreated: 1, points: 10 }
        });

        res.status(201).json(problem);
    } catch (error) {
        console.error('Error creating problem:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message,
            details: error.errors 
        });
    }
});

// Vote on problem
router.post('/:id/vote', async (req, res) => {
    try {
        const { voteType } = req.body;
        const problem = await Problem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        if (voteType === 'up') {
            problem.upvotes += 1;
        } else {
            problem.downvotes += 1;
        }

        await problem.save();
        res.json(problem);
    } catch (error) {
        console.error('Error voting on problem:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get problem by ID
router.get('/:id', async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id)
            .populate('author', 'username');
        
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        res.json(problem);
    } catch (error) {
        console.error('Error fetching problem:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 