import React from 'react';
import QuestionListItem from './QuestionListItem';

const QuestionList = ({ qList }) => {

    if(qList.length !== 0) {
        const renderedList = qList.map((question, index) => {
            return <QuestionListItem
                key={index}
                question={question.question}
                answer={question.answer}
            />;
        });
        
        return (
            <div className="row justify-content-center">
                {renderedList}
            </div>
        );
    }

    return null;
};

export default QuestionList;