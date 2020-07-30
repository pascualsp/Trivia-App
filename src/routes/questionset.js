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

        res.send(qs);
    } catch(e) {
        res.status(500).send();
    }
});

// Add Question to specified QuestionSet
router.post('/qset/:id/add', async (req, res) => {
    try {
        const qs = await QuestionSet.findOne({ _id: req.params.id });
        const q = await Question.findOne({ _id: req.body.qid })

        if(!qs || !q) {
            return res.status(404).send();
        }

        qs.questions = qs.questions.concat({ qid: q._id });
        await qs.save();
        
        res.send(qs);
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

        qs.questions.forEach(async (question) => {
            await Question.findOneAndDelete({ _id: question.qid });
        });

        res.send(qs);
    } catch(e) {
        res.status(500).send();
    }
});

// Remove question from specified QuestionSet
router.delete('/qset/:id/remove', async (req, res) => {
    try {
        const qs = await QuestionSet.findOne({ _id: req.params.id });

        if(!qs) {
            return res.status(404).send();
        }

        qs.questions = qs.questions.filter((question) => {
            return question.qid.toString() !== req.body.id;
        });
        await qs.save();
        
        res.send(qs);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;