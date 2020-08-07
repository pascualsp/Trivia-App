import React from 'react';
import LoadBoard from './LoadBoard';
import CreateBoard from './CreateBoard';
import QuestionList from './QuestionList';
import QuestionAdderButton from './QuestionAdderButton';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

class App extends React.Component {
    // TODO: CHANGE ADDER MODAL IMPLEMENTATION. MAKE ADDER COME FROM ADDERBUTTON
    state = { qTitle: "", qsetID: null, questions: [] };

    setBoard = (title, qid, questions) => {
        this.setState({ qTitle: title, qsetID: qid, questions: questions });
    };

    loadQuestions = async () => {
        const response = await axios.get('/qset/qs/' + this.state.qsetID);
        this.setState({ questions: response.data })
    }

    render() {
        return (
            <Router>
                <Container fluid={true}>
                    <LoadBoard qsetID={this.state.qsetID} setBoard={this.setBoard} />
                    <Route path="/">
                        <CreateBoard qsetID={this.state.qsetID} setBoard={this.setBoard} />
                    </Route>
                    <h1 className="row display-4 justify-content-center">{this.state.qTitle} </h1>
                    <QuestionList qList={this.state.questions} />
                    <QuestionAdderButton qsetID={this.state.qsetID} loadQuestions={this.loadQuestions} />
                </Container>
            </Router>
        );
    }
}

export default App;