import React from 'react';
import QuestionListItem from './QuestionListItem';

const QuestionList = ({ qList, deleteQuestion }) => {

    if(qList.length !== 0) {
        const renderedList = qList.map((question, index) => {
            return <QuestionListItem
                key={index}
                qid={question._id}
                question={question.question}
                answer={question.answer}
                deleteQuestion={deleteQuestion}
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