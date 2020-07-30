const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    questions: [{
        qid: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }]
}, {
    timestamps: true
});

const QuestionSet = mongoose.model('QuestionSet', setSchema);

module.exports = QuestionSet;