const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    questions: [{
        qid: {
            type: String,
            required: true
        },
        custom: {
            type: Boolean,
            default: false
        }
    }]
}, {
    timestamps: true
});

const QuestionSet = mongoose.model('QuestionSet', setSchema);

module.exports = QuestionSet;