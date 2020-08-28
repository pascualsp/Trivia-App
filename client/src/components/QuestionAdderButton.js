import React, { useState } from 'react';
import { Card, CardText, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';
import QuestionAdder from './QuestionAdder';

const QuestionAdderButton = ({ qsetID, loadQuestions }) => {
    const [modal, setModal] = useState(false);
    const [adderModal, setAdderModal] = useState(false);
    const [adderType, setAdderType] = useState(null);

    const toggle = () => setModal(!modal);
    const adderToggle = () => setAdderModal(!adderModal);

    const cascadeToggle = () => {
        adderToggle();
        toggle();
    };

    const selectAdderType = (type) => {
        setAdderType(type);
        adderToggle();
    }

    if (qsetID !== null) {
        return (
            <div className="row justify-content-center">
                <Card onClick={toggle} className="text-center outline-button m-3">
                    <CardText className="display-4 my-1">+</CardText>
                    <CardText className="mx-3 mb-3">Add question</CardText>
		        </Card>
                <Modal isOpen={modal} toggle={toggle} className="modal-lg">
                    <ModalHeader>
                        <i onClick={toggle}><span className="close">&larr;</span></i>
                    </ModalHeader>
                    <ModalBody className="row justify-content-center">
                        <Card onClick={() => selectAdderType("custom")} className="text-center qButton m-3">
                            <CardBody className="d-flex flex-column">
                                <CardText className="lead">Create your own question</CardText>
                            </CardBody>
                        </Card>
                        <Card onClick={() => selectAdderType("api")} className="text-center qButton m-3">
                            <CardBody className="d-flex flex-column">
                                <CardText className="lead">Add question from database</CardText>
                            </CardBody>
                        </Card>
                        <Modal isOpen={adderModal} toggle={adderToggle} className="modal-xl">
                            <ModalHeader toggle={cascadeToggle}>
                                <i onClick={adderToggle}><span className="close">&larr;</span></i>
                            </ModalHeader>
                            <ModalBody className="row justify-content-center">
                                <QuestionAdder adder={adderType} qsetID={qsetID} loadQuestions={loadQuestions} cascadeToggle={cascadeToggle} />
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