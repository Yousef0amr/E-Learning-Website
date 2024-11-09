import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, LESSON } from '../../api/endpoints';
import getCookie from '../../utils/getCookie';
import convertToFormData from '../../utils/convertToFormData';

export const lessonApi = createApi({
    reducerPath: 'lessonApi',
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + LESSON,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    tagTypes: ['Lesson', 'Question', 'Answer'],
    endpoints: (builder) => ({
        // Notes Endpoints
        getAllNotes: builder.query({
            query: (id) => `/${id}/notes`,
            providesTags: [{ type: 'Lesson', id: 'LIST' }],
        }),
        addNote: builder.mutation({
            query: (note) => ({
                url: `/${note.lesson_id}/notes`,
                method: 'POST',
                body: convertToFormData(note)
            }),
            invalidatesTags: [{ type: 'Lesson', id: 'LIST' }],
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/notes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Lesson', id: 'LIST' }],
        }),
        updateNote: builder.mutation({
            query: (note) => ({
                url: `/notes/${note.note_id}`,
                method: 'PATCH',
                body: convertToFormData({ title: note.title, content: note.content })
            }),
            invalidatesTags: [{ type: 'Lesson', id: 'LIST' }],
        }),

        // Q&A Endpoints
        getAllQuestions: builder.query({
            query: ({ id, page, limit }) => `/${id}/questions?page=${page}&limit=${limit}`,
        }),

        addQuestion: builder.mutation({
            query: (question) => ({
                url: `/${question.lesson_id}/questions`,
                method: 'POST',
                body: convertToFormData(question)
            }),
        }),
        updateQuestion: builder.mutation({
            query: ({ question_id, question }) => ({
                url: `/questions/${question_id}`,
                method: 'PUT',
                body: { question }
            }),
        }),
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `/questions/${id}`,
                method: 'DELETE',
            }),

        }),
        getAllAnswers: builder.query({
            query: ({ id, page, limit }) => `/questions/${id}/answers?page=${page}&limit=${limit}`,
        }),
        // Answers Endpoints
        addAnswer: builder.mutation({
            query: ({ lesson_question_id, answer, lesson_id }) => ({
                url: `/questions/${lesson_question_id}/answers`,
                method: 'POST',
                body: convertToFormData({ answer, lesson_id }),
            }),

        }),
        updateAnswer: builder.mutation({
            query: ({ answer_id, answer }) => ({
                url: `/answers/${answer_id}`,
                method: 'PUT',
                body: convertToFormData({ answer, })
            }),

        }),
        deleteAnswer: builder.mutation({
            query: (id) => ({
                url: `/answers/${id}`,
                method: 'DELETE',
            }),

        }),
    }),
});

export const {
    useGetAllNotesQuery,
    useAddNoteMutation,
    useDeleteNoteMutation,
    useUpdateNoteMutation,
    useGetAllQuestionsQuery,
    useAddQuestionMutation,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation,
    useAddAnswerMutation,
    useUpdateAnswerMutation,
    useDeleteAnswerMutation,
    useGetAllAnswersQuery
} = lessonApi;
