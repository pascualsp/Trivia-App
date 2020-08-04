import React, { useState } from 'react';
import { Card, CardText, Button, CardBody } from 'reactstrap';

const QuestionListItem = ({ question, answer }) => {
    const [answerText, setAnswer] = useState("Reveal answer");
    const [revealed, setRevealed] = useState(true);

    const revealAnswer = () => {
        setRevealed(!revealed);
        if (revealed) {
            setAnswer(answer);
        } else {
            setAnswer("Reveal answer");
        }
    };

    return (
        <Card className="col-xl-2 col-lg-3 col-md-4 text-center m-3" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
            <CardBody className="d-flex flex-column">
                <CardText>{question}</CardText>
                <Button onClick={() => revealAnswer()} size="md" className="mt-auto">{answerText}</Button>
            </CardBody>
		</Card>
    );
};

export default QuestionListItem;