import React, { useState } from 'react'
import { Card, CardBody, CardText, Button, UncontrolledTooltip } from 'reactstrap';

const QuestionAPIItem = ({ bID, q, a, add }) => {
    const [answerText, setAnswer] = useState("Reveal answer");
    const [revealed, setRevealed] = useState(true);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const revealAnswer = () => {
        setRevealed(!revealed);
        if (revealed) {
            setAnswer(a);
        } else {
            setAnswer("Reveal answer");
        }
    };

    const addQuestion = (q, a) => {
        add(q, a);
        setTooltipOpen(true);
        setTimeout(() => setTooltipOpen(false), 2000);
    }

    return (
        <Card className="col-xl-3 col-lg-4 col-md-5 text-center m-3" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
            <CardBody className="d-flex flex-column">
                <CardText>{q}</CardText>
                <div className="mt-auto">
                    <div className="row justify-content-center">
                        <Button onClick={() => revealAnswer()} size="md" className="row">{answerText}</Button>
                    </div>
                    <div className="row justify-content-center">
                        <Button id={"q" + bID.toString()} outline onClick={() => addQuestion(q, a)} size="md" className="wButton row m-2">Add Question</Button>
                        <UncontrolledTooltip placement="right" target={"q" + bID.toString()} isOpen={tooltipOpen} trigger="click">
                            Question added!
                        </UncontrolledTooltip>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default QuestionAPIItem;