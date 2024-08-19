import React from 'react';
import './../styles/auth.css';
import tree from './../assets/tree.png';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';





export const Login = () => {
    return (
        <AuthLayout title='تسجيل الدخول' background={tree} >
            <LoginForm />
        </AuthLayout>
    );
};
