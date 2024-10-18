import React from 'react';
import './../styles/auth.css';

import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import { Footer } from '../components/common/Footer';
import AppStrings from '../utils/appStrings';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';




export const Login = () => {
    const { t } = useTranslation();
    return (
        <>
            <AuthLayout title={t(AppStrings.login)}  >
                <LoginForm />
            </AuthLayout>
            <Footer />
            <ToastContainer />
        </>

    );
};
