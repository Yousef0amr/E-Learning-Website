import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ModalDialog from '../components/common/ModalDialog';
import quizBackground from './../assets/quiz.jpg';
import './../styles/quiz.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useGetQuizzesQuery } from '../features/slices/quizSlice';
import QuestionSlides from '../components/quiz/QuestionSlides';
import Loader from '../components/common/Loader';
import QuizResults from '../components/quiz/QuizResults';
import RefreshComponent from '../components/common/RefreshComponent';
import { useLocation } from 'react-router-dom';

const Quiz = () => {
    const [show, setShow] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const lessonId = searchParams.get('lessonId');
    const { data, isLoading, isError, refetch } = useGetQuizzesQuery(lessonId);
    const [quizId, setQuizId] = useState(0);

    const startQuiz = (quizId) => {
        setShow(true);
        setQuizId(quizId);
    };

    const handleCloseQuiz = () => {
        setShow(false);
    };

    if (!lessonId) {
        return (
            <p className='fs-5 text-center'>لا يو جد درس </p>
        );
    }

    return (
        <>
            <div className='quiz'>
                {
                    isLoading ? <Loader /> :
                        isError ? <RefreshComponent refetch={refetch} /> :
                            data?.data?.quizzes.length > 0 ? data?.data?.quizzes.map((quiz) =>
                                <Row className='quiz-container' md={2} xs={1} key={quiz.quiz_id} style={{ marginBottom: '20px' }}>
                                    <Col className='quiz-image' md={5} sm={12} >
                                        <img src={quizBackground} alt="Quiz" />
                                    </Col>
                                    <Col className='quiz-content' md={7} sm={12}>
                                        <h3>{quiz.title}</h3>
                                        {
                                            quiz.quizResults.length > 0 && <QuizResults quizResults={quiz.quizResults[0]} />
                                        }
                                        {
                                            quiz.duration > 0 &&
                                            <div className='time d-flex align-items-center'>
                                                <FontAwesomeIcon className='time-icon' icon={faClock} />
                                                <span>وقت الاختبار: {(quiz.duration / 60).toFixed(0)} دقيقة </span>
                                            </div>
                                        }
                                        <Button onClick={() => startQuiz(quiz.quiz_id)} className='start-quiz'>
                                            {quiz.quizResults.length > 0 ? 'أعادة الاختبار' : 'ابدأ الاختبار'}
                                        </Button>
                                    </Col>
                                </Row>
                            ) : <p className='fs-5'>لا يوجد اختبارات لهذا الدرس</p>
                }
            </div>
            <ModalDialog open={show} onClose={() => setShow(false)}>
                <QuestionSlides handleCloseQuiz={handleCloseQuiz} quizId={quizId} />
            </ModalDialog>
        </>
    );
};

export default Quiz;
