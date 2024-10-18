import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faAt, faRightFromBracket, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from 'react-bootstrap';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from './../../features/slices/authSlice';
import { useAuth } from './../../utils/auth';
import notification from '../../utils/toastNotify';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import SpinnerLoader from '../common/Spinner';
import getErrorMessage from '../../utils/validationResponseError';
const schema = yup.object({
    email: yup.string().email("قم بأدخال بريد الكتروني صحيح").required("البريد الالكتروني مطلوب"),
    password: yup.string().min(8, "كلمة المرور يجب ان تكون اكبر من 8 احرف").required("كلمة المرور مطلوبة")
}).required();

const LoginForm = () => {

    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { loginLocal } = useAuth();
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = useCallback(async (user) => {
        const newUser = {
            email: user.email,
            password: user.password,
        };

        try {
            const data = await login(newUser).unwrap();
            if (data.error) {
                const message = getErrorMessage(data.error);
                throw new Error(message);
            }
            if (data.data.accessToken) {
                loginLocal(data.data);
                notification('success', t(AppStrings.loginSuccess));
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 2000);
            }
        } catch (err) {
            notification('error', t(AppStrings.loginFailed), err);
        }
    }, [login, loginLocal, navigate, t]);


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='input-filed'>
                <input
                    placeholder={t(AppStrings.email)}
                    {...register('email')}
                />
                <FontAwesomeIcon icon={faAt} className='icon-filed' />
            </div>
            {errors.email && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.email.message}</div>}
            <div className='input-filed'>
                <input
                    placeholder={t(AppStrings.password)}
                    type='password'
                    {...register('password')}
                />
                <FontAwesomeIcon icon={faHashtag} className='icon-filed' />
            </div>
            {errors.password && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.password.message}</div>}

            <Button type="submit" className='submit-button' disabled={isLoading}>

                {isLoading ? <SpinnerLoader /> : <><FontAwesomeIcon icon={faRightFromBracket} /> {t(AppStrings.login)}</>}
            </Button>
            <div className='mt-3  d-flex flex-row-reverse ' >
                <p>  {t(AppStrings.forgot_password)} </p>
                <Link to={'/reset-password-email'}  >
                    {t(AppStrings.click_here)}

                </Link>
            </div>
            <div className='no-account mt-2 d-flex flex-row-reverse'>
                <p>{t(AppStrings.no_account)}</p>
                <Link to={'/sign-up'}><span>{'!'}{t(AppStrings.sign_up)}</span></Link>

            </div>


        </Form>
    );
};

export default LoginForm;
