import React from 'react';
import { Container, Form, Input, Button, FormGroup } from 'reactstrap';

class App extends React.Component {
    state = {qsetID: null};

    render() {
        return (
            <Container>
                <h1 className="row display-2 justify-content-center">Quizia</h1>
                <p className="row lead justify-content-center">Create your own collection of trivia questions</p>
                <p className="row lead justify-content-center">Choose from a database of 3000+ trivia questions</p>
                <hr width="400em" style={{borderColor: "white"}} />
                <h2 className="row display-4 justify-content-center" style={{marginTop: "2em"}}>Question board title:</h2>
                <div className="row justify-content-center">
                    <Form className="col-6">
                        <FormGroup>
                            <Input type="text" name="qs" id="qsTitle" size="lg"/>
                        </FormGroup>
                        <Button block>Create Board</Button>
                    </Form>
                </div>
            </Container>
        );
    }
}

export default App;