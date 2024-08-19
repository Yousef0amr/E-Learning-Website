
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, COURSE } from '../../api/endpoints';
import getCookie from '../../utils/getCookie';

export const courseApi = createApi({
    reducerPath: 'courseApi',
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
    }),
});

export const { useGetCourseQuery } = courseApi;
