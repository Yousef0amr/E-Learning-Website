
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, COURSE } from '../../api/endpoints';
import getCookie from '../../utils/getCookie';
import convertToFormData from '../../utils/convertToFormData';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + COURSE,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCourse: builder.query({
            query: (id) => `/${id}`,
        }),
        updateWatchLessonVideo: builder.mutation({
            query: (data) => ({
                url: `/lessons/watch`,
                method: 'POST',
                body: convertToFormData(data),
            })
        })
    }),
});

export const { useGetCourseQuery, useUpdateWatchLessonVideoMutation } = courseApi;
