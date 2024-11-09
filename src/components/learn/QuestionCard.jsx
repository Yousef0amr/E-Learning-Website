import React from 'react'
import ModalDialog from '../common/ModalDialog'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import CommentCard from './CommentCard';
import AnswerCard from './AnswerCard';
import { useLocation } from 'react-router-dom';
const QuestionCard = ({ question }) => {

    const [open, setOpen] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const lessonId = searchParams.get('lessonId');
    return (
        <>  <div className="d-flex justify-content-between">
            <CommentCard question={question} />
            <span style={{ cursor: 'pointer', color: 'var(--text-color)' }}><FontAwesomeIcon icon={faComment} onClick={() => setOpen(true)} /></span>
        </div>
            <ModalDialog open={open} onClose={() => { setOpen(false) }} optionalChildren={
                <CommentCard question={question} />
            }>
                <AnswerCard lesson_id={lessonId} question_id={question.lesson_question_id} />
            </ModalDialog>
        </>
    )
}

export default QuestionCard
