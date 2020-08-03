const express = require('express');
const Question = require('../models/question');

const router = new express.Router();

// Create new Question
router.post('/q', async (req, res) => {
    const q = new Question({
        question: req.body.question,
        answer: req.body.answer,
        owner: req.body.owner
    });

    try {
        await q.save();
        res.status(201).send(q);
    } catch(e) {
        res.status(400).send();
    }
});

// Get Question from id
router.get('/q/:id', async (req, res) => {
    try {
        const q = await Question.findOne({ _id: req.params.id });

        if(!q) {
            return res.status(404).send();
        }

        res.send(q);
    } catch(e) {
        res.status(500).send();
    }
});

// Delete Question
router.delete('/q/:id', async (req, res) => {
    try {
        const q = await Question.findOneAndDelete({ _id: req.params.id });

        if(!q) {
            return res.status(404).send();
        }

        res.send(q);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;