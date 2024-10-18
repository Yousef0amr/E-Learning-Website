import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faUser, faPhone } from '@fortawesome/free-solid-svg-icons'
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import SpinnerLoader from '../common/Spinner';

const UserForm = ({ user, onSubmit, isLoading }) => {
    const [edit, setEdit] = useState(true);
    const { t } = useTranslation();


    const schema = yup.object({
        userName: yup.string().min(6, t(AppStrings.user_name_length_error)),
        phone: yup.string().min(10, t(AppStrings.user_phone_length_error)).max(11),
    }).required();

    const { register, handleSubmit, formState: { errors }, reset } = useForm(
        { resolver: yupResolver(schema) }
    );


    const handleOnClose = () => {
        setEdit(true);
        reset();
    };

    useEffect(() => {
        if (!isLoading) {
            setEdit(true);
        }
    }, [isLoading]);

    return (
        <Card className='card-profile' >
            <Card.Body className='card-body-profile' >
                <Form onSubmit={handleSubmit(onSubmit)}  >
                    <Row className="mb-3 ">
                        <Col sm={2}>

                            <Form.Label className='fs-5'><FontAwesomeIcon icon={faUser} /><span className='me-2'>{t(AppStrings.name_of_Al_Ghaly)}</span></Form.Label>
                        </Col>
                        <Col sm={10}>
                            <Form.Control {...register("userName")} disabled={edit} type="text" placeholder={user?.userName}
                            />
                            {errors.userName && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.userName.message}</div>}
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={2}>
                            <Form.Label className='fs-5 '><FontAwesomeIcon icon={faPhone} color='var(--text-color)' /> <span className='me-2'>{t(AppStrings.phone)}</span> </Form.Label>
                        </Col>
                        <Col sm={10}>
                            <Form.Control {...register("phone")} disabled={edit} type="text" placeholder={user?.phone} />
                            {errors.phone && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.phone.message}</div>}
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={2}></Col>
                        <Col sm={5}>
                            {
                                edit ? <Button className='w-100' style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => setEdit(!edit)}>{t(AppStrings.edit)}</Button> : null
                            } {!edit ? <Button type='submit' className='w-100' disabled={isLoading} style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} >{isLoading ? <SpinnerLoader /> : t(AppStrings.save)}</Button> : null
                            }

                        </Col>
                        {
                            !edit && <Col sm={5}>
                                <Button className='w-100' variant='danger' onClick={() => handleOnClose()}>{t(AppStrings.cancel)}</Button>
                            </Col>
                        }

                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default UserForm;
