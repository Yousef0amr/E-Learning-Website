
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, COUPON } from '../../api/endpoints';
import getCookie from '../../utils/getCookie';
import convertToFormData from '../../utils/convertToFormData';
export const couponApi = createApi({
    reducerPath: 'couponApi',
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + COUPON,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCouponByCode: builder.mutation({
            query: (code) => ({
                url: `/code`,
                method: 'POST',
                body: convertToFormData(code)
            }),
        }),
    }),
});

export const { useGetCouponByCodeMutation } = couponApi;
