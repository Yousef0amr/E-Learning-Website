import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import ChangePasswordForm from '../components/changePassword/ChangePasswordForm'
import { useChangePasswordMutation } from '../features/slices/authSlice'
import notification from '../utils/toastNotify'
import getErrorMessage from '../utils/validationResponseError'
import { ToastContainer } from 'react-toastify'
import lock from './../assets/shield.png'
import { useTranslation } from 'react-i18next'
import AppStrings from '../utils/appStrings'
const ChangePassword = () => {
    const [changePassword, { isLoading }] = useChangePasswordMutation()
    const { t } = useTranslation()
    const handleChangePassword = async (changeData) => {
        const { oldPassword, newPassword } = changeData
        try {
            const result = await changePassword({ oldPassword, newPassword }).unwrap();

            if (result.error) {
                const message = getErrorMessage(result.error);
                throw new Error(message);
            }
            notification('success', result.message || t(AppStrings.password_changed));

        } catch (error) {

            notification('error', t(AppStrings.failed_to_change_password), error);
        }
    };

    return (
        <Row >
            <Col lg={12}>
                <Card className='card-profile bg-primary'>
                    <Card.Body className='card-body-profile text-center'>
                        <img src={lock} alt="lock" className='lock-img' style={{ width: '250px', height: '250px' }} />
                        <ChangePasswordForm onSubmit={handleChangePassword} isLoading={isLoading} />
                    </Card.Body>
                </Card>
            </Col>
            <ToastContainer />
        </Row>
    )
}

export default ChangePassword
