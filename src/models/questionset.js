const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const QuestionSet = mongoose.model('QuestionSet', setSchema);

module.exports = QuestionSet;