import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RestPasswordForm from '../components/forgetPassword/RestPasswordForm';
import { useResetPasswordMutation } from '../features/slices/authSlice';
import notification from '../utils/toastNotify';
import { useTranslation } from 'react-i18next';
import AppStrings from '../utils/appStrings';
import { Container } from 'react-bootstrap';
import ResetPassword from '../assets/resetPassword1.png'
const RestPassword = () => {
    const location = useLocation();
    const { isVerified, email } = location.state || {};
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const { t } = useTranslation();

    useLayoutEffect(() => {
        if (!isVerified) {
            window.location.href = '/';
        }
    }, [isVerified]);



    const onSubmit = async (data) => {
        try {
            const result = await resetPassword({ email, newPassword: data.newPassword }).unwrap();
            if (result.data.isChanged) {
                window.location.href = '/login';
            }

        } catch (error) {
            notification('error', t(AppStrings.failded_to_reset), error);
        }
    };

    return (
        <Container style={{ height: '85vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <div className='d-flex flex-column align-items-center justify-content-center' style={{ boxShadow: '1px 1px 10px var(--text-color)', padding: '40px 0', borderRadius: '4px' }}>
                <h3 className='fs-4 text-center'>{t(AppStrings.reset_password)}</h3>
                <img src={ResetPassword} alt='lock' style={{ width: '200px', height: '150px' }} />
                <RestPasswordForm onSubmit={onSubmit} isLoading={isLoading} />
            </div>

        </Container>
    );
};

export default RestPassword;
