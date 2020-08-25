import React, { useState } from 'react';
import { Form, Input, Button, FormGroup } from 'reactstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const CreateBoard = ({ qsetID, setBoard }) => {
    const [title, setTitle] = useState("");
    const history = useHistory();

    const initBoard = async (e) => {
        e.preventDefault();
        const response = await axios.post('/qset', { title });
        setBoard(response.data.title, response.data._id, []);
        history.push('/?qs=' + response.data._id);
    };

    if(qsetID === null) {
        return (
            <div>
                <h1 className="row display-2 justify-content-center">Quizia</h1>
                <p className="row lead justify-content-center">Create your own collection of trivia questions</p>
                <p className="row lead justify-content-center">Choose from a database of 3000+ trivia questions</p>
                <hr/>
                <h2 className="row display-4 justify-content-center" style={{ marginTop: "2em" }}>Question board title:</h2>
                <div className="row justify-content-center">
                    <Form onSubmit={initBoard} className="col-lg-5 col-md-8">
                        <FormGroup>
                            <Input type="text" size="lg"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <Button block>Create board</Button>
                    </Form>
                </div>
            </div>
        )
    }

    return null;
}

export default CreateBoard;