const express = require('express');
const QuestionSet = require('../models/questionset');
const Question = require('../models/question');

const router = new express.Router();

// Create new QuestionSet
router.post('/qset', async (req, res) => {
    const qs = new QuestionSet({
        title: req.body.title
    });

    try {
        await qs.save();
        res.status(201).send(qs);
    } catch(e) {
        res.status(400).send();
    }
});

// Get QuestionSet from id
router.get('/qset/:id', async (req, res) => {
    try {
        const qs = await QuestionSet.findOne({ _id: req.params.id });

        if(!qs) {
            return res.status(404).send();
        }

        res.status(200).send(qs);
    } catch(e) {
        res.status(500).send();
    }
});

// Get Questions from QuestionSet
router.get('/qset/qs/:id', async (req, res) => {
    try {
        const qs = await Question.find({ owner: req.params.id });

        if(!qs) {
            return res.status(404).send();
        }

        res.status(200).send(qs);
    } catch(e) {
        res.status(500).send();
    }
});

// Delete QuestionSet and associated Questions
router.delete('/qset/:id', async (req, res) => {
    try {
        const qs = await QuestionSet.findOneAndDelete({ _id: req.params.id });

        if(!qs) {
            return res.status(404).send();
        }

        await Question.deleteMany({ owner: qs._id });

        res.send(qs);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;