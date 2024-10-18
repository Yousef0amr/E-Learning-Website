import React from 'react'


const Question = ({ question, selectedAnswers, handleAnswerClick }) => {

    return (
        <div key={question.question_id} className='question'>
            <div className='question-header'>
                <p>{question.question_text}</p>
            </div>
            <ul className='answer'>
                {question.options.map((option, index) => (
                    <li
                        key={index + question.question_id}
                        onClick={() => handleAnswerClick(question.question_id, option)}
                        className={`${selectedAnswers[question.question_id] === option ? 'active-answer' : ''}`}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Question
