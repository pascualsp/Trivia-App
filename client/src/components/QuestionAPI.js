import React, { useState, useEffect } from 'react';
import { Card, CardText } from 'reactstrap';
import axios from 'axios';
import QuestionAPIItem from './QuestionAPIItem';

const QuestionAPI = ({ cid, cat, add }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = async () => {
        const response = await axios.get("https://opentdb.com/api.php?amount=9&encode=url3986&category=" + cid.toString());
        setQuestions(response.data.results);
    };

    if (questions !== undefined && questions.length !== 0) {
        const renderedList = questions.map((question, index) => {
            return <QuestionAPIItem
                key={index}
                bID={index}
                q={decodeURIComponent(question.question)}
                a={decodeURIComponent(question.correct_answer)}
                add={add}
            />;
        });

        return (
            <div>
                <h1 className="row display-4 justify-content-center q-title">{cat}</h1>
                <div className="row justify-content-center">
                    {renderedList}
                </div>
                <div className="row justify-content-center">
                    <Card onClick={getQuestions} className="text-center outline-button m-3">
                        <CardText className="display-4 mt-2 mb-1 q-title">&#10227;</CardText>
                        <CardText className="mx-3 mb-3">Refresh list</CardText>
                    </Card>
                </div>
            </div>
        );
    }

    return <h1 className="display-4 justify-content-center q-title">Loading...</h1>;
}

export default QuestionAPI;