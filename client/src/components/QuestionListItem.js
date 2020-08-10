import React, { useState } from 'react';
import { Card, CardText, Button, CardBody, Modal, ModalBody } from 'reactstrap';

const QuestionListItem = ({ qid, question, answer, deleteQuestion }) => {
    const [answerText, setAnswer] = useState("Reveal answer");
    const [revealed, setRevealed] = useState(true);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const revealAnswer = () => {
        setRevealed(!revealed);
        if (revealed) {
            setAnswer(answer);
        } else {
            setAnswer("Reveal answer");
        }
    };

    const processDelete = () => {
        deleteQuestion(qid);
        toggle();
    };

    return (
        <Card className="col-xl-2 col-lg-3 col-md-4 text-center m-3" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
            <i onClick={toggle}><span className="close">&times;</span></i>
            <CardBody className="d-flex flex-column">
                <CardText>{question}</CardText>
                <Button onClick={revealAnswer} size="md" className="mt-auto">{answerText}</Button>
            </CardBody>
            <Modal isOpen={modal} toggle={toggle} className="modal-md">
                <ModalBody className="justify-content-center">
                    <h2 className="row lead justify-content-center">Are you sure you want to delete this question?</h2>
                    <Card onClick={processDelete} className="text-center qButton m-3" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
                        <CardBody className="d-flex flex-column">
                            <CardText className="lead">Yes</CardText>
                        </CardBody>
                    </Card>
                    <Card onClick={toggle} className="text-center qButton m-3" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
                        <CardBody className="d-flex flex-column">
                            <CardText className="lead">No</CardText>
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
		</Card>
    );
};

export default QuestionListItem;