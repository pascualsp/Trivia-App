import React, { useState, useEffect } from 'react';
import { Card, CardText, Button, CardBody, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, UncontrolledTooltip } from 'reactstrap';

const QuestionListItem = ({ bID, qid, question, answer, deleteQuestion, edit }) => {
    const [answerText, setAnswer] = useState("Reveal answer");
    const [revealed, setRevealed] = useState(false);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editQuestion, setEditQuestion] = useState(question);
    const [editAnswer, setEditAnswer] = useState(answer);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setModal(!modal);
    const editToggle = () => {
        setEditQuestion(question);
        setEditAnswer(answer);
        setEditModal(!editModal);
    };

    const revealAnswer = () => {
        setRevealed(!revealed);
    };

    useEffect(() => {
        if (revealed) {
            setAnswer(answer);
        } else {
            setAnswer("Reveal answer");
        }
    }, [revealed, answer]);

    const processDelete = () => {
        deleteQuestion(qid);
        toggle();
    };

    const processEdit = (e) => {
        e.preventDefault();

        if (editQuestion.trim() !== "" && editAnswer.trim() !== "") {
            if (editQuestion !== question || editAnswer !== answer) {
                setRevealed(false);
                edit(qid, editQuestion, editAnswer);
                setTooltipOpen(true);
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setTooltipOpen(false), 2000);
        return () => clearTimeout(timer);
    }, [tooltipOpen]);

    return (
        <Card className="col-xl-2 col-lg-3 col-md-4 text-center m-3" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
            <i>
                <span onClick={editToggle} className="edit">&#9998;</span>
                <span onClick={toggle} className="close">&times;</span>
            </i>
            <CardBody className="d-flex flex-column">
                <CardText>{question}</CardText>
                <Button block onClick={revealAnswer} className="mt-auto">{answerText}</Button>
            </CardBody>
            <Modal isOpen={modal} toggle={toggle} className="modal-md">
                <ModalBody>
                    <h2 className="row lead justify-content-center">Are you sure you want to delete this question?</h2>
                    <Card onClick={processDelete} className="text-center qButton m-3" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
                        <CardBody className="lead">Yes</CardBody>
                    </Card>
                    <Card onClick={toggle} className="text-center qButton m-3" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
                        <CardBody className="lead">No</CardBody>
                    </Card>
                </ModalBody>
            </Modal>
            <Modal isOpen={editModal} toggle={editToggle} className="modal-xl">
                <ModalHeader>
                    <i onClick={editToggle}><span className="close">&larr;</span></i>
                </ModalHeader>
                <ModalBody className="row justify-content-center">
                    <Form onSubmit={processEdit}>
                        <FormGroup>
                            <h2 className="row lead justify-content-center">Question:</h2>
                            <Input type="text" style={{width: 500}}
                                value={editQuestion}
                                onChange={(e) => setEditQuestion(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <h2 className="row lead justify-content-center">Answer:</h2>
                            <Input type="text"
                                value={editAnswer}
                                onChange={(e) => setEditAnswer(e.target.value)}
                            />
                        </FormGroup>
                        <Button block id="eButton">Edit Question</Button>
                        <UncontrolledTooltip placement="right" target="eButton" isOpen={tooltipOpen} trigger="click">
                            Question edited!
                        </UncontrolledTooltip>
                    </Form>
                </ModalBody>
            </Modal>
		</Card>
    );
};

export default QuestionListItem;