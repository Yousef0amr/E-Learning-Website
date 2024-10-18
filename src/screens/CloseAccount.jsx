import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import ModalDialog from './../components/common/ModalDialog';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import * as yup from "yup";
import { useDeleteUserProfileMutation } from '../features/slices/authSlice';
import notification from '../utils/toastNotify';
import AppStrings from '../utils/appStrings';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import SpinnerLoader from '../components/common/Spinner';


const CloseAccount = () => {
    const [show, setShow] = React.useState(false);
    const [deleteUserProfile, { isLoading }] = useDeleteUserProfileMutation();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { logoutLocal } = useAuth();
    const schema = yup.object({
        password: yup.string().min(8, t(AppStrings.password_length_error)).required(t(AppStrings.password_required_error)),
    }).required();

    const { register, handleSubmit, formState: { errors }, reset } = useForm(
        { resolver: yupResolver(schema) }
    );

    const handleDeleteProfile = async (password) => {
        try {
            const result = await deleteUserProfile(password).unwrap();
            if (!result.data) {
                throw new Error(t(AppStrings.faild_to_delete_user));
            }
            notification('success', t(AppStrings.user_deleted_successfully));
            setTimeout(() => {
                logoutLocal();
                navigate('/login', { replace: true });
            });

        } catch (error) {
            notification('error', t(AppStrings.failed_to_delete_user), error);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            reset();
            setShow(false);
        }
    }, [isLoading, reset, setShow]);


    return (
        <Row >
            <Col lg={12}>
                <Card className='card-profile bg-primary'>
                    <Card.Body className='card-body-profile text-center'>
                        <h3> {t(AppStrings.close_account)} </h3>
                        <hr />
                        <p className='fs-5 p-4'>
                            <span className='text-danger fw-bold'> {t(AppStrings.warning)}</span>: {t(AppStrings.close_account_warning_message)}
                        </p>

                        <Button className='w-50 fs-5 p-2 btn btn-dark' onClick={() => setShow(true)}> {t(AppStrings.close_account_button)} </Button>
                    </Card.Body>
                </Card>
            </Col>
            <ModalDialog onClose={() => { setShow(false) }} open={show} >
                <Form onSubmit={handleSubmit(handleDeleteProfile)}  >
                    <div className='text-center mt-3 fs-5 p-2'>
                        <p>{t(AppStrings.delete_account_confirmation)}</p>
                        <Form.Control className='p-2 fs-6 ' style={{ direction: 'rtl' }} {...register("password")} type="password" placeholder={t(AppStrings.password)}
                        />
                        {errors.password && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.password.message}</div>}
                    </div>
                    <div className='d-flex justify-content-between gap-3 mt-3'>
                        <Button className='p-2 btn btn-secondary flex-grow-1' onClick={() => setShow(false)}>{t(AppStrings.cancel)}</Button>
                        <Button className='p-2 btn btn-danger flex-grow-1' type="submit" >{isLoading ? <SpinnerLoader /> : t(AppStrings.confirm)}</Button>
                    </div>
                </Form>
            </ModalDialog>
            <ToastContainer />
        </Row>
    );
};

export default CloseAccount;
