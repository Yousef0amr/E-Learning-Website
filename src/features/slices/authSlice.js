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
            })
        }),
        login: builder.mutation({
            query: (userCredentials) => ({
                url: '/login',
                method: 'POST',
                body: convertToFormData(userCredentials),
            })
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/refresh',
                method: 'POST',
                body: convertToFormData({ refreshToken: getCookie('refreshToken') }),
            }),
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: '/current-user',
                method: 'GET',
            }),
            providesTags: ['USER'],
        }),
        updateUserProfile: builder.mutation({
            query: (user) => ({
                url: '/current-user',
                method: 'PATCH',
                body: convertToFormData(user),
            }),
            invalidatesTags: ['USER'],
        }),
        deleteUserProfile: builder.mutation({
            query: (password) => ({
                url: '/current-user',
                method: 'DELETE',
                body: convertToFormData(password),
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: '/change-password',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
        checkEmail: builder.mutation({
            query: (data) => ({
                url: '/check-email',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: '/verify-email',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
        resendCode: builder.mutation({
            query: (data) => ({
                url: '/resend-code',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
        forgetPassword: builder.mutation({
            query: (data) => ({
                url: '/forget-password',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/reset-password',
                method: 'POST',
                body: convertToFormData(data),
            }),
        }),
        logout: builder.mutation({

            query: () => ({
                url: '/logout',
                method: 'POST',
            })
        }),
    }),
});

export const { useChangePasswordMutation, useResetPasswordMutation, useResendCodeMutation, useVerifyEmailMutation, useForgetPasswordMutation, useCheckEmailMutation, useSignUpMutation, useLoginMutation, useLogoutMutation, useRefreshMutation, useGetUserProfileQuery, useUpdateUserProfileMutation, useDeleteUserProfileMutation } = authApi;
