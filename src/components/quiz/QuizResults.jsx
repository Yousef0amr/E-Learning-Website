import React from 'react'
import { Col, Row } from 'react-bootstrap'

const QuizResults = ({ quizResults }) => {
    return (
        <Row className='quiz-results' lg={5} md={3} sm={2} xs={1}  >
            <Col >
                النتيجة
                <span> {quizResults.score} %</span>
            </Col>
            <Col >
                وقت الانتهاء
                <span>{quizResults.completionTime}</span>
            </Col>
            <Col >
                الاجابات الخاطئة
                <span>{quizResults.incorrectAnswers}</span>

            </Col>
            <Col  >
                الاجابات الصحيحة
                <span>  {quizResults.correctAnswers}</span>
            </Col >
            <Col >
                عدد الاسئلة
                <span>{quizResults.totalQuestions}</span>
            </Col>
        </Row>
    )
}

export default QuizResults
