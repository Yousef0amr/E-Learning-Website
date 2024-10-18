import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import SpinnerLoader from '../common/Spinner';

const RestPasswordForm = ({ onSubmit, isLoading }) => {
    const { t } = useTranslation()

    const schema = yup.object({
        newPassword: yup.string().min(8, t(AppStrings.password_length_error)).required(t(AppStrings.password_required_error)),
        confirmPassword: yup.ref("newPassword", t(AppStrings.password_match_error))
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });


    return (
        <Form onSubmit={handleSubmit(onSubmit)} style={{ direction: 'rtl' }} >
            <Row className="mt-3 gap-3 align-items-center justify-content-center p-4" >
                <Col sm={8}>
                    <Form.Control className='fs-5 p-2' {...register("newPassword")} type="password" placeholder={t(AppStrings.new_password)} />
                    {errors.newPassword && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.newPassword.message}</div>}
                </Col>
                <Col sm={8}>
                    <Form.Control className='fs-5 p-2' {...register("confirmPassword")} type="password" placeholder={t(AppStrings.confirm_password)} />
                    {errors.confirmPassword && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.confirmPassword.message}</div>}
                </Col>
                <Col sm={8}>
                    {
                        <Button type="submit" className='w-100 fs-5 p-2' style={{ backgroundColor: 'var(--primary-color)', border: 'none' }} > {isLoading ? <SpinnerLoader /> : t(AppStrings.reset_password)}</Button>
                    }
                </Col>
            </Row>
        </Form>
    )
}

export default RestPasswordForm
