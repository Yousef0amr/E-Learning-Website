import React, { useEffect, useState } from 'react';
import { Container, Alert, Stack } from 'react-bootstrap';
import QuestionForm from './QuestionForm';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import { lessonApi, useAddQuestionMutation, useGetAllQuestionsQuery } from '../../features/slices/lessonSlice';
import socket from './../../app/socket';
import QuestionCard from './QuestionCard';
import { useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Loader from '../common/Loader';
import RefreshComponent from '../common/RefreshComponent';
import { useLocation } from 'react-router-dom';
const QuestionAnswer = () => {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lessonId = searchParams.get('lessonId');
  const { data, isLoading, isError, refetch } = useGetAllQuestionsQuery(
    { id: lessonId, page, limit: pageSize }
  );
  const dispatch = useDispatch();

  const [addQuestion, { isLoading: isAddingQuestion }] = useAddQuestionMutation();

  const { t } = useTranslation();

  console.log(data)
  // Socket connection for real-time question and answer updates
  useEffect(() => {
    socket.connect();
    socket.emit('joinLessonRoom', lessonId);

    // Listener for real-time question updates
    socket.on('newQuestion', (newQuestion) => {
      try {
        dispatch(
          lessonApi.util.updateQueryData(
            'getAllQuestions',
            { id: lessonId, page: 1, limit: pageSize },
            (draft) => {
              if (draft.data) {
                draft.data.questions.unshift(newQuestion);
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
      socket.disconnect();
      socket.off('newQuestion');
    };
  }, [lessonId]);

  const handleAddQuestion = async (questionText) => {
    try {
      await addQuestion({ lesson_id: lessonId, question: questionText.question }).unwrap();
    } catch (error) {
      console.error('Failed to add question:', error);
    }
  };



  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Container className="note-container">
      <QuestionForm onSubmitClicked={handleAddQuestion} isLoading={isAddingQuestion} lessonId={lessonId} />

      {isLoading ? <Loader /> :
        isError ?
          <RefreshComponent refetch={refetch} /> : <Stack gap={4} style={{ marginTop: '30px' }}>
            {data?.data?.questions.map((question) => (
              <QuestionCard question={question} key={question.lesson_question_id} />
            ))}
          </Stack>
      }

      <Pagination
        hideNextButton
        hidePrevButton
        variant="outlined"
        color="primary"
        count={data?.data?.pagination?.totalPages}
        defaultPage={1}
        page={page}
        onChange={handleChange}
        sx={{
          marginTop: '30px',
          '& .MuiPaginationItem-root': {
            color: 'var(--text-color)',
            borderColor: 'var(--primary-color)',
          },
          '& .Mui-selected': {
            backgroundColor: 'var(--primary-color) !important',
            color: 'white !important',
          },
        }}
      />

    </Container>
  );
};

export default QuestionAnswer;
