import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { faCircleExclamation, faGift } from '@fortawesome/free-solid-svg-icons'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';

const CouponForm = ({ onSubmit }) => {
    const { t } = useTranslation()
    const schema = yup.object({
        code: yup.string().min(6, t(AppStrings.coupon_length_error)).required(t(AppStrings.coupon_required_error)),
    }).required();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} className='coupon-form'>
                <div className="input-container">
                    <input placeholder={t(AppStrings.coupon_placeholder)} className="input-field" type="text"   {...register('code')} />
                    <label htmlFor="input-field" className="input-label"><FontAwesomeIcon icon={faGift} className=' mx-1' />{t(AppStrings.your_coupon)}</label>
                    <span className="input-highlight"></span>
                </div>
                <Button type="submit" className='copy-btn'>{t(AppStrings.apply)}</Button>
            </Form>
            {errors.code && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.code.message}</div>}
        </>

    )
}

export default CouponForm
