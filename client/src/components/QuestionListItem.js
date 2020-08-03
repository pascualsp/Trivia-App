import React from 'react';

const QuestionListItem = ({ question, answer }) => {
    return (
        <div className="col-2 text-center">
            <p>{question}</p>
            <p>{answer}</p>
		</div>
    );
};

export default QuestionListItem;