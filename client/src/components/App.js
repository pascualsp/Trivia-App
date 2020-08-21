import React from 'react';
import LoadBoard from './LoadBoard';
import CreateBoard from './CreateBoard';
import QuestionList from './QuestionList';
import QuestionAdderButton from './QuestionAdderButton';
import LinkButton from './LinkButton';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

class App extends React.Component {
    state = { qTitle: "", qsetID: null, questions: [] };

    setBoard = (title, qid, questions) => {
        this.setState({ qTitle: title, qsetID: qid, questions: questions });
    };

    loadQuestions = async () => {
        const response = await axios.get('/qset/qs/' + this.state.qsetID);
        this.setState({ questions: response.data })
    }

    deleteQuestion = async(qid) => {
        await axios.delete('/q/' + qid);
        this.loadQuestions();
    }

    editQuestion = async(qid, newQuestion, newAnswer) => {
        await axios.patch('/q/' + qid, { question:newQuestion, answer:newAnswer});
        this.loadQuestions();
    }

    render() {
        return (
            <Router>
                <Container fluid={true}>
                    <LoadBoard qsetID={this.state.qsetID} setBoard={this.setBoard} />
                    <Route path="/">
                        <CreateBoard qsetID={this.state.qsetID} setBoard={this.setBoard} />
                    </Route>
                    <h1 className="row display-3 justify-content-center">{this.state.qTitle} </h1>
                    <LinkButton qsetID={this.state.qsetID} />
                    <QuestionList qList={this.state.questions} deleteQuestion={this.deleteQuestion} editQuestion={this.editQuestion} />
                    <QuestionAdderButton qsetID={this.state.qsetID} loadQuestions={this.loadQuestions} />
                </Container>
            </Router>
        );
    }
}

export default App;