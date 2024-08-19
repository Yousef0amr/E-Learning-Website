
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LEVEL, BASEURL } from '../../api/endpoints';
import getCookie from '../../utils/getCookie.js';

export const levelApi = createApi({
    reducerPath: 'levelApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + LEVEL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getLevels: builder.query({
            query: () => '',
        }),
        getLevel: builder.query({
            query: (id) => `/${id}`,
        }),

    }),
});

export const { useGetLevelsQuery, useGetLevelQuery } = levelApi;
