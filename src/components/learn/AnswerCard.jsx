import React, { useEffect, useState } from 'react'
import AnswerForm from './AnswerForm'
import { Stack } from 'react-bootstrap'
import { lessonApi, useAddAnswerMutation, useGetAllAnswersQuery } from '../../features/slices/lessonSlice'
import socket from './../../app/socket';
import { useDispatch } from 'react-redux';
import Loader from '../common/Loader';
import RefreshComponent from '../common/RefreshComponent';
import CommentCard from './CommentCard';
const AnswerCard = ({ lesson_id, question_id }) => {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const dispatch = useDispatch()
    const { data, isLoading, isError, refetch } = useGetAllAnswersQuery(
        { id: question_id, page, limit: pageSize }
    )
    const [addAnswer, { isLoading: isAddingAnswer }] = useAddAnswerMutation()

    console.log(data)
    useEffect(() => {
        socket.connect();
        socket.emit('joinLessonRoom', lesson_id);

        socket.on('newAnswer', (newAnswer) => {
            console.log(newAnswer)
            try {
                dispatch(
                    lessonApi.util.updateQueryData(
                        'getAllAnswers',
                        { id: question_id, page: 1, limit: pageSize },
                        (draft) => {
                            if (draft.data) {
                                draft.data.answers.unshift({ ...newAnswer.answer, username: newAnswer.username });
                            } else {
                                console.error('Draft structure is not as expected:', draft);
                            }
                        }
                    ));
            } catch (error) {
                console.error('Error updating query data:', error);
            }
        });

        return () => {
            socket.off('newAnswer');
        };
    }, [lesson_id]);
    const handleAddAnswer = async (answerText) => {
        try {
            await addAnswer({ lesson_question_id: question_id, answer: answerText.answer, lesson_id }).unwrap();

        } catch (error) {
            console.error('Failed to add answer:', error);
        }
    };


    return (
        <div className="card-comment">
            {isLoading ? <Loader /> :
                isError ?
                    <RefreshComponent refetch={refetch} /> : <Stack gap={4} style={{ marginTop: '30px', paddingRight: '30px' }}>
                        {data?.data?.answers.length > 0 ?
                            data?.data?.answers.map((reply) => (
                                <CommentCard question={reply} key={reply.lesson_answer_id} />
                            )) : <p className='text-center  text-muted m-5'>لا يوجد ردود على هذا السؤال </p>
                        }
                    </Stack>
            }
            <AnswerForm onSubmitClicked={handleAddAnswer} isEditAnswer={false} />
        </div>
    )
}

export default AnswerCard
