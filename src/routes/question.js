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

// Edit Question
router.patch('/q/:id', async (req, res) => {
    const updates = Object.keys(req.body);

    try {
        const q = await Question.findOne({ _id: req.params.id });

        if(!q) {
            return res.status(404).send();
        }

        updates.forEach((update) => q[update] = req.body[update]);
        await q.save();

        res.send(q);
    } catch(e) {
        res.status(400).send(e);
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