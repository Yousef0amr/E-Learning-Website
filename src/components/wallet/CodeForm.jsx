import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faHashtag } from '@fortawesome/free-solid-svg-icons'
import * as yup from "yup";
import { useChargeCodeMutation } from '../../features/slices/paymentSlice';
import notification from '../../utils/toastNotify';
import getErrorMessage from '../../utils/validationResponseError';
import { useGetUserProfileQuery } from '../../features/slices/authSlice';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';


const CodeForm = () => {
    const [chargeCode, { isLoading }] = useChargeCodeMutation()
    const { refetch } = useGetUserProfileQuery()
    const { t } = useTranslation()


    const schema = yup.object({
        code: yup.string().min(11, t(AppStrings.enter_valid_charge_code)).max(11, t(AppStrings.enter_valid_charge_code)).required(t(AppStrings.charge_code_required)),
    }).required();
    const { register, handleSubmit, formState: { errors }, reset } = useForm(
        { resolver: yupResolver(schema) }
    );


    const onSubmit = async (data) => {
        try {
            const newChargeCode = await chargeCode(data).unwrap();
            if (newChargeCode.error) {
                const message = getErrorMessage(newChargeCode.error);
                throw new Error(message);
            }
            reset();
            refetch();
            notification('success', newChargeCode.message || t(AppStrings.charge_code_added_successfully));

        } catch (error) {
            notification('error', t(AppStrings.failed_to_add_charge_code), error);
        }
    };


    return (
        <Row style={{ padding: '20px', gap: '20px' }}>
            <Col lg={12} className='d-flex justify-content-center align-items-center gap-1 fs-5 ' style={{ color: '#7e8590', backgroundColor: 'var(--question-color-4)', padding: '50px 10px', borderRadius: '5px' }} >
                {
                    [...Array(11)].map((_, index) => {
                        return (
                            <span key={index} className='p-1 rounded bg-light overflow-hidden text-center'>
                                <FontAwesomeIcon icon={faHashtag} />
                            </span>
                        )
                    })
                }

            </Col>
            <Form onSubmit={handleSubmit(onSubmit)}  >
                <Col lg={12} className='mt-3'>
                    <Form.Control style={{ fontSize: '20px', padding: '10px' }} minLength={11} maxLength={11}  {...register("code")} placeholder={t(AppStrings.enter_charge_code)} />
                    {errors.code && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.code.message}</div>}
                </Col>
                <Col lg={12} className='mt-3'       >
                    <Button type="submit" style={{ width: '100%', padding: '10px', fontSize: '20px', backgroundColor: 'var(--question-color-4)', border: 'none' }} >{isLoading ? t(AppStrings.processing) : t(AppStrings.charge_code)}   </Button>
                </Col>
            </Form>

        </Row>
    )
}

export default CodeForm
