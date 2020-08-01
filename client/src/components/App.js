import React from 'react';
import LoadBoard from './LoadBoard';
import CreateBoard from './CreateBoard';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
    // TODO: IMPLEMENT BOARD WITH MORE COMPONENTS; ADD MORE TO STATE TO REPRESENT BOARD
    state = {qsetID: null};

    setBoard = (qid) => {
        this.setState({ qsetID: qid })
    };
    
    render() {
        return (
            <Router>
                <Container>
                    <LoadBoard qsetID={this.state.qsetID} setBoard={this.setBoard} />
                    <Route path="/">
                        <CreateBoard qsetID={this.state.qsetID} setBoard={this.setBoard} />
                    </Route>
                </Container>
            </Router>
        );
    }
}

export default App;