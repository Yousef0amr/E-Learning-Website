import React from 'react';

import './../styles/auth.css';
import thinkImage from './../assets/thinkImage.jpeg';
import SignUpForm from '../components/auth/SignUpForm';
import AuthLayout from '../components/auth/AuthLayout';





export const SignUp = () => {

    return (
        <AuthLayout title='أنشئ حسابك الأن' background={thinkImage} >
            <SignUpForm />
        </AuthLayout>
    );
}
