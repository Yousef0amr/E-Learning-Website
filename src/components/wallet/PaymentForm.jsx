import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import * as yup from "yup";
import { useGenerateWalletInvoiceMutation } from '../../features/slices/paymentSlice';
import notification from '../../utils/toastNotify';
import getErrorMessage from '../../utils/validationResponseError';
import { useGetUserProfileQuery } from '../../features/slices/authSlice';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import SpinnerLoader from './../common/Spinner';;

const PaymentForm = () => {
    const [generateWalletInvoice, { isLoading }] = useGenerateWalletInvoiceMutation()
    const { refetch } = useGetUserProfileQuery()
    const { t } = useTranslation()


    const schema = yup.object({
        points: yup.number().integer().min(1).max(2000).required(),
    }).required();
    const { register, handleSubmit, formState: { errors }, reset } = useForm(
        { resolver: yupResolver(schema) }
    );



    const onSubmit = async (data) => {
        const orderData = {
            price: data.points,
            title: 'شحن المحفظة',
            description: 'شحن المحفظة',
        };

        try {
            const result = await generateWalletInvoice(orderData).unwrap();
            if (result.error) {
                const message = getErrorMessage(result.error);
                throw new Error(message);
            }
            if (result.data.invoiceUrl) {
                window.location.href = result.data.invoiceUrl
            }

        } catch (error) {
            notification("error", getErrorMessage(error));
        }
    }


    return (
        <Row style={{ padding: '20px', gap: '20px' }}>
            <Col lg={12} style={{ textAlign: 'center', fontSize: '90px', color: 'var(--question-color-3)', borderRadius: '5px' }} >
                <FontAwesomeIcon icon={faCreditCard} />
            </Col>
            <Form onSubmit={handleSubmit(onSubmit)}  >
                <Col lg={12} className='mt-3'>
                    <Form.Control style={{ fontSize: '20px', padding: '10px' }} minLength={1} maxLength={2000}  {...register("points")} placeholder={t(AppStrings.number_of_points)} />
                    {errors.points && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.points.message}</div>}
                </Col>
                <Col lg={12} className='mt-3'       >
                    <Button type="submit" style={{ width: '100%', padding: '10px', fontSize: '20px', backgroundColor: 'var(--question-color-3)', border: 'none' }} > {isLoading ? <SpinnerLoader /> : t(AppStrings.pay_with_online_payment)}  </Button>
                </Col>
            </Form>

        </Row>
    )
}

export default PaymentForm
