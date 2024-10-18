import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import * as yup from "yup";

import notification from '../../utils/toastNotify';
import getErrorMessage from '../../utils/validationResponseError';

import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import { useForgetPasswordMutation } from '../../features/slices/authSlice';
import ModalDialog from '../common/ModalDialog';
import VerifyEmail from './VerifyEmail';
import SpinnerLoader from '../common/Spinner';

const ResetPasswordEmailForm = () => {
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation()
    const [show, setShow] = React.useState({
        isOpen: false,
        payload: ''
    });
    const { t } = useTranslation()


    const schema = yup.object({
        email: yup.string().email(t(AppStrings.user_email_invalid_error)).required(t(AppStrings.user_email_required_error)),
    }).required();
    const { register, handleSubmit, getValues, formState: { errors } } = useForm(
        { resolver: yupResolver(schema) }
    );


    const onSubmit = async (data) => {
        try {
            const email = await forgetPassword(data).unwrap();
            if (email.error) {
                const message = getErrorMessage(email.error);
                throw new Error(message);
            }
            setShow(prev => ({ isOpen: true, payload: email.data.secret }));
        } catch (error) {
            notification('error', t(AppStrings.failed_to_send), error);
        }
    };
    return (<>

        <Form onSubmit={handleSubmit(onSubmit)}   >
            <Row style={{ gap: '5px', }}>
                <Col sm={12} lg={12} className='mt-3'>
                    <Form.Control style={{ fontSize: '18px', padding: '10px', direction: 'rtl' }}   {...register("email")} placeholder={t(AppStrings.email)} />
                    {errors.email && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.email.message}</div>}
                </Col>
                <Col sm={12} lg={12} className='d-flex flex-column align-items-center justify-content-center mt-3'       >
                    <Button type="submit" style={{ padding: '16px', fontSize: '16px', backgroundColor: 'var(--primary-color)', border: 'none' }} >
                        {isLoading ? <SpinnerLoader /> : <>
                            <span style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faLongArrowAltLeft} /></span>  {t(AppStrings.send_email)} </>}
                    </Button>
                </Col>
            </Row>
        </Form>

        <ModalDialog open={show.isOpen} onClose={() => { setShow(false); }} >
            <VerifyEmail email={getValues('email')} payload={show.payload} choice={true} />
        </ModalDialog>
    </>
    )
}

export default ResetPasswordEmailForm;


