const express = require('express');
const QuestionSet = require('../models/questionset');

const router = new express.Router();

// Create new QuestionSet
router.post('/qs', async (req, res) => {
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
router.get('/qs/:id', async (req, res) => {
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

// Add question to specified QuestionSet
router.post('/qs/:id/add', async (req, res) => {
    try {
        const qs = await QuestionSet.findOne({ _id: req.params.id });

        if(!qs) {
            return res.status(404).send();
        }

        qs.questions = qs.questions.concat({ ...req.body });
        await qs.save();
        
        res.send(qs);
    } catch(e) {
        res.status(500).send();
    }
});

// Delete QuestionSet
router.delete('/qs/:id', async (req, res) => {
    try {
        const qs = await QuestionSet.findOneAndDelete({ _id: req.params.id });

        if(!qs) {
            return res.status(404).send();
        }

        res.send(qs);
    } catch(e) {
        res.status(500).send();
    }
});

// Remove question from specified QuestionSet
router.delete('/qs/:id/remove', async (req, res) => {
    try {
        const qs = await QuestionSet.findOne({ _id: req.params.id });

        if(!qs) {
            return res.status(404).send();
        }

        qs.questions = qs.questions.filter((question) => {
            return question._id.toString() !== req.body.id;
        });
        await qs.save();
        
        res.send(qs);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;