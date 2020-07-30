const express = require('express');
const mongoose = require('mongoose');
const qSetRouter = require('./routes/questionset');
const questionRouter = require('./routes/question');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(qSetRouter);
app.use(questionRouter);

// Configure and connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected'))
    .catch((e) => console.log(e));

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});