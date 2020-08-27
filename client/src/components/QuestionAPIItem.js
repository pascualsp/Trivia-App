import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardText, Button, UncontrolledTooltip } from 'reactstrap';

const QuestionAPIItem = ({ bID, q, a, add }) => {
    const [answerText, setAnswer] = useState("Reveal answer");
    const [revealed, setRevealed] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    useEffect(() => {
        setRevealed(false);;
    }, [q]);

    const revealAnswer = () => {
        setRevealed(!revealed);
    };

    useEffect(() => {
        if (revealed) {
            setAnswer(a);
        } else {
            setAnswer("Reveal answer");
        }
    }, [revealed, a]);

    const addQuestion = (q, a) => {
        add(q, a);
        setTooltipOpen(true);
    }

    useEffect(() => {
        const timer = setTimeout(() => setTooltipOpen(false), 2000);
        return () => clearTimeout(timer);
    }, [tooltipOpen]);

    return (
        <Card className="col-xl-3 col-lg-4 col-md-5 text-center m-3">
            <CardBody className="d-flex flex-column">
                <CardText>{q}</CardText>
                <Button block onClick={() => revealAnswer()} className="mt-auto">{answerText}</Button>
                <Button block outline id={"q" + bID.toString()} onClick={() => addQuestion(q, a)} className="wButton">Add Question</Button>
                <UncontrolledTooltip placement="right" target={"q" + bID.toString()} isOpen={tooltipOpen} trigger="click">
                    Question added!
                </UncontrolledTooltip>
            </CardBody>
        </Card>
    );
};

export default QuestionAPIItem;