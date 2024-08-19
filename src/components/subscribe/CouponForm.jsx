import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { faCircleExclamation, faGift } from '@fortawesome/free-solid-svg-icons'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';

const schema = yup.object({
    code: yup.string().min(6, "  يجب ان يكون الكوبون اكبر من 6 احرف").required("الكوبون الخاص بك مطلوب"),
}).required();
const CouponForm = ({ onSubmit }) => {

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
                    <input placeholder="الكوبون الخاص بك" className="input-field" type="text"   {...register('code')} />
                    <label htmlFor="input-field" className="input-label"><FontAwesomeIcon icon={faGift} className=' mx-1' />الكوبون الخاص بك</label>
                    <span className="input-highlight"></span>
                </div>
                <Button type="submit" className='copy-btn'>تطبيق</Button>
            </Form>
            {errors.code && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.code.message}</div>}
        </>

    )
}

export default CouponForm
