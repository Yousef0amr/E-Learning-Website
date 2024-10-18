import React from 'react'
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../../features/slices/authSlice'
import UserForm from './UserForm'
import { Card, Col, Form, ProgressBar, Row } from 'react-bootstrap'
import getErrorMessage from '../../utils/validationResponseError'
import notification from '../../utils/toastNotify'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'

const UserProfile = () => {
    const { data } = useGetUserProfileQuery()
    const [updateUserProfile, { isLoading: isLoadingUpdate }] = useUpdateUserProfileMutation()
    const { t } = useTranslation()

    const handleEditProfile = async (user) => {
        try {
            const result = await updateUserProfile(user).unwrap();
            if (result.error) {
                const message = getErrorMessage(result.error);
                throw new Error(message);
            }
            notification('success', result.message || t(AppStrings.user_updated_successfully));

        } catch (error) {
            notification('error', t(AppStrings.failed_to_update_user), error);
        }
    };

    return (
        <>
            <UserForm user={data?.data?.user} onSubmit={handleEditProfile} isLoading={isLoadingUpdate} />
            <Row className="mt-3">
                <Col lg={12}>
                    <Card className='card-profile'>
                        <Card.Body className='card-body-profile'>
                            <h5 className="card-title">{t(AppStrings.total_of_your_progress)}</h5>

                            <div className="mb-3">
                                <Form.Label>{t(AppStrings.number_videos_watched)}</Form.Label>
                                <ProgressBar variant='success' now={10} label={`${10}`} />
                            </div>
                            <div className="mb-3">
                                <Form.Label>{t(AppStrings.number_quizzes_completed)}</Form.Label>
                                <ProgressBar variant='info' now={5} label={`${5}`} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default UserProfile
