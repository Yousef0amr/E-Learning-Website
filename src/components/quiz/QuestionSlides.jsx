import React, { useState } from 'react';
import { useGetQuizQuery, useAddQuizResultMutation } from '../../features/slices/quizSlice';
import Question from './Question';
import { Button } from 'react-bootstrap';
import CustomSwiper from '../common/Swiper';
import Loader from '../common/Loader';
import { useGetEnrollmentCourseQuery } from '../../features/slices/enrollmentSlice';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RefreshComponent from '../common/RefreshComponent';
import AppStrings from '../../utils/appStrings';
import SpinnerLoader from '../common/Spinner';

const QuestionSlides = ({ handleCloseQuiz, quizId }) => {
    const { data, isLoading, isError, refetch: refetchQuiz } = useGetQuizQuery(quizId);
    const { enrollmentId } = useParams();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [addQuizResult, { isLoading: isLoadingAddQuizResult }] = useAddQuizResultMutation();
    const { refetch } = useGetEnrollmentCourseQuery(enrollmentId);
    const { t } = useTranslation();

    const handleAnswerClick = (questionId, selectedOption) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));
    };

    const handleQuizSubmit = async () => {
        let correctAnswers = 0;
        let incorrectAnswers = 0;
        data?.data?.quiz?.questions?.forEach(question => {
            if (selectedAnswers[question.question_id] === question.correct_answer) {
                correctAnswers += 1;
            } else {
                incorrectAnswers += 1;
            }
        });

        const score = correctAnswers * 100 / data?.data?.quiz?.questions?.length;

        await addQuizResult({
            correctAnswers,
            incorrectAnswers,
            totalQuestions: correctAnswers + incorrectAnswers,
            score: score,
            completionTime: 0,
            quiz_id: quizId
        }).unwrap();

        refetch();
        setSelectedAnswers({});
        handleCloseQuiz();
    };

    return (
        <div style={{ width: '1400px', maxWidth: '100%' }}>
            {
                isLoading ? <Loader /> :
                    isError ? <RefreshComponent refetch={refetchQuiz} /> :
                        data?.data?.quiz?.questions.length > 0 ? <CustomSwiper close={handleQuizSubmit} slides={
                            data.data.quiz.questions.map((question) =>
                                <Question key={question.question_id} question={question} selectedAnswers={selectedAnswers} handleAnswerClick={handleAnswerClick} />
                            )
                        } >
                            <Button className='quiz-submit' onClick={handleQuizSubmit} >{isLoadingAddQuizResult ? <SpinnerLoader /> : t(AppStrings.submit_quiz)} </Button>
                        </CustomSwiper> : <div className='text-center fs-5'>{t(AppStrings.no_questions)}</div>
            }

        </div>
    );
};

export default QuestionSlides;
