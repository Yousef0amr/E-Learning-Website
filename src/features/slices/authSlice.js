import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, USER } from './../../api/endpoints.js';
import convertToFormData from './../../utils/convertToFormData.js'
import getCookie from './../../utils/getCookie.js'


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + USER,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: convertToFormData(newUser),
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    return error
                }
            },
        }),
        login: builder.mutation({
            query: (userCredentials) => ({
                url: '/login',
                method: 'POST',
                body: convertToFormData(userCredentials),
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {

                    await queryFulfilled;
                } catch (error) {
                    return error
                }
            },
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/refresh',
                method: 'POST'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    return error
                }
            },
        }),
        logout: builder.mutation({

            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    return error
                }
            },
        }),
    }),
});

export const { useSignUpMutation, useLoginMutation, useLogoutMutation, useRefreshMutation } = authApi;
