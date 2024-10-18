import React, { useState, useCallback } from 'react';
import './../styles/auth.css';
import SignUpForm from '../components/auth/SignUpForm';
import AuthLayout from '../components/auth/AuthLayout';
import { Footer } from '../components/common/Footer';
import { useTranslation } from 'react-i18next';
import AppStrings from '../utils/appStrings';
import { ToastContainer } from 'react-toastify';
import { useCheckEmailMutation, useSignUpMutation } from '../features/slices/authSlice';
import notitifation from '../utils/toastNotify';
import ModalDialog from '../components/common/ModalDialog';
import VerifyEmail from '../components/forgetPassword/VerifyEmail';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import notification from '../utils/toastNotify';
import getErrorMessage from '../utils/validationResponseError';

export const SignUp = () => {
    const { t } = useTranslation();
    const [checkEmail, { isLoading: isLoadingCheckEmail }] = useCheckEmailMutation();
    const [show, setShow] = useState({ isOpen: false, email: '', payload: '' });
    const navigate = useNavigate();
    const [signUp, { isLoading }] = useSignUpMutation();
    const { loginLocal } = useAuth();
    const [userData, setUserData] = useState({});


    const handleClose = useCallback(async () => {
        setShow(prev => ({ ...prev, isOpen: false }));
        try {
            if (!isLoading) {
                const data = await signUp(userData).unwrap();
                if (data.error) {
                    const message = getErrorMessage(data.error);
                    throw new Error(message);
                }
                if (data.data.accessToken) {
                    loginLocal(data.data);
                    notification('success', t(AppStrings.signupSuccess));
                    setTimeout(() => {
                        navigate('/', { replace: true });
                    }, 2000);
                }
            }
        } catch (error) {
            notification('error', t(AppStrings.signupFailed), error);
        }
    }, [isLoading, signUp, userData, loginLocal, navigate, t]);

    // Memoized handleCheckEmail function to avoid re-creation on each render
    const handleCheckEmail = useCallback(async (email) => {
        try {
            const data = await checkEmail({ email }).unwrap();
            if (data.data.secret) {
                setShow(() => ({ isOpen: true, email: email, payload: data.data.secret }));
            }
        } catch (error) {
            notitifation('error', t(AppStrings.failed_to_send), error);
        }
    }, [checkEmail, t]);

    // Memoized onSubmit function
    const onSubmit = useCallback((user) => {
        handleCheckEmail(user.email);
        setUserData(prev => ({ ...prev, ...user }));
    }, [handleCheckEmail]);

    return (
        <>
            <AuthLayout title={t(AppStrings.sign_up)} >
                <SignUpForm isLoading={isLoading || isLoadingCheckEmail} onSubmit={onSubmit} />
            </AuthLayout>
            <ModalDialog open={show.isOpen} onClose={() => setShow(prev => ({ ...prev, isOpen: false }))}>
                <VerifyEmail email={show.email} payload={show.payload} choice={false} handleClose={handleClose} />
            </ModalDialog>
            <Footer />
            <ToastContainer />
        </>
    );
};
