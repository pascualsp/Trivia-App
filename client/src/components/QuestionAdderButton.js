import React, { useState } from 'react';
import { Card, CardText, CardBody, Modal, ModalBody } from 'reactstrap';
import QuestionAdder from './QuestionAdder';

const QuestionAdderButton = ({ qsetID, loadQuestions }) => {
    const [modal, setModal] = useState(false);
    const [adderModal, setAdderModal] = useState(false);
    const [adderType, setAdderType] = useState(null);

    const toggle = () => setModal(!modal);
    const adderToggle = () => setAdderModal(!adderModal);

    const selectAdderType = (type) => {
        setAdderType(type);
        adderToggle();
    }

    if (qsetID !== null) {
        return (
            <div className="row justify-content-center">
                <Card onClick={toggle} className="text-center qButton m-3" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
                    <CardBody>
                        <CardText className="display-4">+</CardText>
                        <CardText>Add Question</CardText>
                    </CardBody>
		        </Card>
                <Modal isOpen={modal} toggle={toggle} className="modal-lg">
                    <ModalBody className="row justify-content-center">
                        <Card onClick={() => selectAdderType("custom")} className="text-center qButton m-3" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
                            <CardBody className="d-flex flex-column">
                                <CardText className="lead">Create your own Question</CardText>
                            </CardBody>
                        </Card>
                        <Card onClick={() => selectAdderType("api")} className="text-center qButton m-3" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
                            <CardBody className="d-flex flex-column">
                                <CardText className="lead">Add Question from database</CardText>
                            </CardBody>
                        </Card>
                        <Modal isOpen={adderModal} toggle={adderToggle} className="modal-xl">
                            <ModalBody className="row justify-content-center">
                                <QuestionAdder adder={adderType} qsetID={qsetID} loadQuestions={loadQuestions} />
                            </ModalBody>
                        </Modal>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    return null;
};

export default QuestionAdderButton;