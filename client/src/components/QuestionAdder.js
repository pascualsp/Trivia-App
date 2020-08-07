import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, UncontrolledTooltip } from 'reactstrap';
import axios from 'axios';

const QuestionAdder = ({ adder, qsetID, loadQuestions }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const addQuestion = async (e) => {
        e.preventDefault();
        if (question.trim() !== "" && answer.trim() !== "") {
            await axios.post('/q', { question, answer, owner:qsetID });
            setTooltipOpen(true);
            setTimeout(() => setTooltipOpen(false), 3500);
            setQuestion("");
            setAnswer("");
            loadQuestions();
        }
    };

    if (adder === "custom") {
        return (
            <div className="row justify-content-center">
                <Form onSubmit={addQuestion}>
                    <FormGroup>
                        <h2 className="row lead justify-content-center">Question:</h2>
                        <Input type="text" style={{width: 500}}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h2 className="row lead justify-content-center">Answer:</h2>
                        <Input type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </FormGroup>
                    <Button block id="addButton">Add Question</Button>
                    <UncontrolledTooltip placement="right" target="addButton" isOpen={tooltipOpen} trigger="click">
                        Question added!
                    </UncontrolledTooltip>
                </Form>
            </div>
        );
    } else if (adder === "api") {
        return (
            <div className="row justify-content-center">
                {adder}
            </div>
        );
    }

    return null;
};

export default QuestionAdder;