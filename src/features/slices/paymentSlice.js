
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, PAYMENT } from '../../api/endpoints';
import getCookie from '../../utils/getCookie';
import convertToFormData from '../../utils/convertToFormData';


export const paymentApi = createApi({
    reducerPath: 'paymentApi',
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
    }),
});

export const { useGenerateInvoiceMutation } = paymentApi;
