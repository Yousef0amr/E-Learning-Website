import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';



const ChangePasswordForm = ({ onSubmit, isLoading }) => {
    const { t } = useTranslation()


    const schema = yup.object({
        oldPassword: yup.string().min(8, t(AppStrings.password_length_error)).required(t(AppStrings.password_required_error)),
        newPassword: yup.string().min(8, t(AppStrings.password_length_error)).required(t(AppStrings.password_required_error)),
        confirmPassword: yup.ref("newPassword", t(AppStrings.password_match_error))
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!isLoading) {
            reset();
        }
    }, [isLoading, reset]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}  >

            <Row className="mt-3">
                <Col sm={2}>

                    <Form.Label className='fs-5'></Form.Label>
                </Col>
                <Col sm={8}>
                    <p className='fs-5'>{t(AppStrings.password)}: </p>
                </Col>
                <Col sm={2}>

                </Col>
            </Row>
            <Row className="mt-2">
                <Col sm={2}>

                    <Form.Label className='fs-5'></Form.Label>
                </Col>
                <Col sm={8}>
                    <Form.Control className='fs-5 p-2' {...register("oldPassword")} type="password" placeholder={t(AppStrings.old_password)} />
                    {errors.oldPassword && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.oldPassword.message}</div>}

                </Col>
                <Col sm={2}>

                </Col>
            </Row>
            <Row className="mt-3">
                <Col sm={2}>

                    <Form.Label className='fs-5'></Form.Label>
                </Col>
                <Col sm={8}>
                    <Form.Control className='fs-5 p-2' {...register("newPassword")} type="password" placeholder={t(AppStrings.new_password)} />
                    {errors.newPassword && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.newPassword.message}</div>}
                </Col>
                <Col sm={2}>

                </Col>
            </Row>
            <Row className="mt-3">
                <Col sm={2}>
                    <Form.Label className='fs-5'></Form.Label>
                </Col>
                <Col sm={8}>
                    <Form.Control className='fs-5 p-2' {...register("confirmPassword")} type="password" placeholder={t(AppStrings.confirm_password)} />
                    {errors.confirmPassword && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.confirmPassword.message}</div>}
                </Col>
                <Col sm={2}>

                </Col>
            </Row>
            <Row className="mt-3">
                <Col sm={2}>

                </Col>
                <Col sm={8}>
                    {
                        <Button type="submit" className='w-100 fs-5 p-2' style={{ backgroundColor: 'var(--question-color-4)', borderColor: 'var(--question-color-4)' }} > {isLoading ? t(AppStrings.changing_password) : t(AppStrings.change_password)}</Button>
                    }
                </Col>
                <Col sm={2}>

                </Col>
            </Row>

        </Form>
    )
}

export default ChangePasswordForm
