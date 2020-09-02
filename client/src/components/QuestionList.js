import React from 'react';
import QuestionListItem from './QuestionListItem';

const QuestionList = ({ qsetID, qList, deleteQuestion, editQuestion }) => {

    if (qList.length !== 0) {
        const renderedList = qList.map((question, index) => {
            return <QuestionListItem
                key={index}
                qid={question._id}
                question={question.question}
                answer={question.answer}
                deleteQuestion={deleteQuestion}
                edit={editQuestion}
            />;
        });
        
        return (
            <div className="row justify-content-center">
                {renderedList}
            </div>
        );
    } else if (qsetID !== null) {
        return (
            <div>
                <p className="row lead justify-content-center mt-4">Looks like there aren't any questions here</p>
                <div className="row justify-content-center mb-3">
                    <p className="lead">Click below to add some!</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-corner-right-down" width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fbb065" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <path d="M6 6h6a3 3 0 0 1 3 3v10l-5 -5m10 0l-5 5" />
                    </svg>
                </div>
            </div>
        )
    }

    return null;
};

export default QuestionList;