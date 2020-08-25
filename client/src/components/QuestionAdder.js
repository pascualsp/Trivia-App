import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Button, UncontrolledTooltip, Card, CardBody, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import QuestionAPI from './QuestionAPI';
import categories from './categories';

const QuestionAdder = ({ adder, qsetID, loadQuestions, cascadeToggle }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [categoryID, setCategoryID] = useState(0);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const cascadeToggle2 = () => {
        toggle();
        cascadeToggle();
    }

    const addQuestion = async (e) => {
        e.preventDefault();

        if (question.trim() !== "" && answer.trim() !== "") {
            await axios.post('/q', { question, answer, owner:qsetID });
            setTooltipOpen(true);
            setQuestion("");
            setAnswer("");
            loadQuestions();
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setTooltipOpen(false), 2000);
        return () => clearTimeout(timer);
    }, [tooltipOpen]);

    const addAPIQuestion = async (q, a) => {
        await axios.post('/q', { question:q, answer:a, owner:qsetID });
        loadQuestions();
    };

    const getApiQuestions = (cid, cat) => {
        setCategoryID(cid);
        setCategoryTitle(cat);
        toggle();
    };

    if (adder === "custom") {
        return (
            <div className="row">
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
                    <Button block id="addButton" className="submitButton">Add Question</Button>
                    <UncontrolledTooltip placement="right" target="addButton" isOpen={tooltipOpen} trigger="click">
                        Question added!
                    </UncontrolledTooltip>
                </Form>
            </div>
        );
    } else if (adder === "api") {
        const categoriesList = categories.map((category, index) => {
            return (
                <Card key={index} onClick={() => getApiQuestions(category.id, category.name)} className="col-xl-3 col-lg-4 col-md-5 text-center qButton m-2" style={{ backgroundColor: '#484848', borderColor: 'white' }}>
                    <CardBody className="d-flex flex-column">
                        <CardText className="lead">{category.name}</CardText>
                    </CardBody>
                </Card>
            );
        });

        return (
            <div className="row justify-content-center">
                <h1 className="row display-4">Choose a Category:</h1>
                <div className="row justify-content-center">
                    {categoriesList}
                </div>
                <Modal isOpen={modal} toggle={toggle} className="modal-xl">
                    <ModalHeader toggle={cascadeToggle2}>
                        <i onClick={toggle}><span className="close">&larr;</span></i>
                    </ModalHeader>
                    <ModalBody className="row justify-content-center">
                        <QuestionAPI cid={categoryID} cat={categoryTitle} add={addAPIQuestion} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    return null;
};

export default QuestionAdder;