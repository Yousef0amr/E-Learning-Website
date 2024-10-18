import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL, QUIZ } from "../../api/endpoints";
import getCookie from "../../utils/getCookie";

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL, prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getQuiz: builder.query({
            query: (id) => ({
                url: `${QUIZ}/${id}`,
                method: 'GET',
            }),

        }),
        addQuizResult: builder.mutation({
            query: (quizResult) => {
                const quizId = quizResult.quiz_id;
                delete quizResult.quiz_id;
                return {
                    url: `${QUIZ}/results/${quizId}`,
                    method: 'POST',
                    body: quizResult,
                };
            },
            invalidatesTags: [{ type: 'quiz', id: 'LIST' }],
        }),
        getQuizzes: builder.query({
            query: (id) => ({
                url: `${QUIZ}?id=${id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    return error;
                }
            },
            providesTags: [{ type: 'quiz', id: 'LIST' }],

        })
    })
});

export const {
    useGetQuizzesQuery,
    useGetQuizQuery,
    useAddQuizResultMutation
} = quizApi;
