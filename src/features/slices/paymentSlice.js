
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, PAYMENT } from '../../api/endpoints';
import getCookie from '../../utils/getCookie';
import convertToFormData from '../../utils/convertToFormData';


export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + PAYMENT,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        generateInvoice: builder.mutation({
            query: (order) => ({
                url: '/generate-invoice',
                method: 'POST',
                body: convertToFormData(order)
            })
        }),
        generateWalletInvoice: builder.mutation({
            query: (order) => ({
                url: '/generate-wallet-invoice',
                method: 'POST',
                body: convertToFormData(order)
            })
        }),
        getAllInvoices: builder.query({
            query: () => ({
                url: '',
                method: 'GET',
            })
        }),
        payWithWallet: builder.mutation({
            query: (order) => ({
                url: '/pay-with-wallet',
                method: 'POST',
                body: convertToFormData(order)
            })
        }),
        chargeCode: builder.mutation({
            query: (chargeCodeDto) => ({
                url: '/charge-code',
                method: 'POST',
                body: convertToFormData(chargeCodeDto)
            })
        }),
    }),
});

export const { useGenerateInvoiceMutation, usePayWithWalletMutation, useGetAllInvoicesQuery, useChargeCodeMutation, useGenerateWalletInvoiceMutation } = paymentApi;
