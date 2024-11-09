
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, USER } from '../../api/endpoints';
import getCookie from '../../utils/getCookie';




export const enrollmentApi = createApi({
    reducerPath: 'enrollmentApi',
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + USER,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getUserEnrollments: builder.query({
            query: () => ({
                url: '/my-courses',
                method: 'GET',

            }),
        }),
        getEnrollmentCourse: builder.query({
            query: (id) => `/my-courses/${id}`,
        }),
    }),
});

export const { useGetUserEnrollmentsQuery, useGetEnrollmentCourseQuery } = enrollmentApi;
