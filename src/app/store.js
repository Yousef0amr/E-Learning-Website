import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/slices/authSlice'
import { levelApi } from '../features/slices/levelSlice'
import { courseApi } from '../features/slices/courseSlice'
import { couponApi } from '../features/slices/couponSlice'
import { paymentApi } from '../features/slices/paymentSlice'
import { enrollmentApi } from '../features/slices/enrollmentSlice'



const store = configureStore(
    {
        reducer: {
            [authApi.reducerPath]: authApi.reducer,
            [levelApi.reducerPath]: levelApi.reducer,
            [courseApi.reducerPath]: courseApi.reducer,
            [couponApi.reducerPath]: couponApi.reducer,
            [paymentApi.reducerPath]: paymentApi.reducer,
            [enrollmentApi.reducerPath]: enrollmentApi.reducer


        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(authApi.middleware, levelApi.middleware,
                courseApi.middleware, couponApi.middleware, paymentApi.middleware,
                enrollmentApi.middleware),

    }
)


export default store