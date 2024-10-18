import React from 'react'
import Form from 'react-bootstrap/Form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faAt, faCircleExclamation, faUser, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import SpinnerLoader from '../common/Spinner';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';


const SignUpForm = ({ isLoading, onSubmit }) => {

    const { t } = useTranslation()

    const schema = yup.object({
        userName: yup.string().min(6, t(AppStrings.user_name_length_error)).required(t(AppStrings.user_name_required_error)),
        phone: yup.string().min(10, t(AppStrings.user_phone_length_error)).max(11,).required(t(AppStrings.user_phone_required_error)),
        email: yup.string().email(t(AppStrings.user_email_invalid_error)).required(t(AppStrings.user_email_required_error)),
        password: yup.string().min(8, t(AppStrings.password_length_error)).required(t(AppStrings.password_required_error))
    }).required();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='input-filed'>
                <input
                    placeholder={t(AppStrings.user_name)}
                    {...register('userName')}
                />
                <FontAwesomeIcon icon={faUser} className='icon-filed' />
            </div >
            {errors.userName && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.userName.message}</div>}
            <div className='input-filed'>
                <input
                    placeholder={t(AppStrings.phone)}
                    {...register('phone')}
                />
                <FontAwesomeIcon icon={faPhone} className='icon-filed' />
            </div >
            {errors.phone && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.phone.message}</div>}
            <div className='input-filed'>
                <input
                    placeholder={t(AppStrings.email)}
                    {...register('email')}
                />
                <FontAwesomeIcon icon={faAt} className='icon-filed' />
            </div >
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
            <Button type="submit" className='submit-button' disabled={isLoading}> {isLoading ? <SpinnerLoader /> : ` ${'!'}   ${t(AppStrings.sign_up)}`}</Button>

            <div className='no-account mt-3 d-flex flex-row-reverse'>
                <p>{t(AppStrings.already_have_account)}   </p>

                <Link to={'/login'}> <span>
                    {t(AppStrings.login)}
                </span></Link>

            </div>

        </Form>
    )
}

export default SignUpForm
