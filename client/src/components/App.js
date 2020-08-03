import React from 'react';
import LoadBoard from './LoadBoard';
import CreateBoard from './CreateBoard';
import QuestionList from './QuestionList';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
    // TODO: CONTINUE WORKING ON QUESTIONLISTITEM
    state = {qTitle: "", qsetID: null, questions: []};

    setBoard = (title, qid, questions) => {
        this.setState({ qTitle: title, qsetID: qid, questions: questions });
    };

    render() {
        return (
            <Router>
                <Container>
                    <LoadBoard qsetID={this.state.qsetID} setBoard={this.setBoard} />
                    <Route path="/">
                        <CreateBoard qsetID={this.state.qsetID} setBoard={this.setBoard} />
                    </Route>
                    <h1 className="row display-4 justify-content-center">{this.state.qTitle}</h1>
                    <QuestionList qList={this.state.questions} />
                </Container>
            </Router>
        );
    }
}

export default App;