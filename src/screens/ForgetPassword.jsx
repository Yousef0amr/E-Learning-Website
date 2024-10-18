import React from 'react'
import ResetPasswordEmailForm from '../components/forgetPassword/ResetPasswordEmailForm'

import { useTranslation } from 'react-i18next'
import AppStrings from '../utils/appStrings'
import { Container } from 'react-bootstrap'
import ResetPasswordBg from '../assets/resetPassword.png'

const ForgetPassword = () => {
    const { t } = useTranslation()
    return (
        <Container style={{ minHeight: '80vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ boxShadow: '1px 1px 10px var(--text-color)', padding: '30px 40px', borderRadius: '5px' }} className='d-flex flex-column align-items-center justify-content-center'>
                <img src={ResetPasswordBg} alt="lock" style={{ width: '280px', height: '280px' }} />
                <h3 className='fs-4 text-center'>{t(AppStrings.reset_password)}</h3>
                <p className='fs-5 text-center'>{t(AppStrings.reset_password_description)}</p>
                <ResetPasswordEmailForm />
            </div>

        </Container>
    )
}

export default ForgetPassword
