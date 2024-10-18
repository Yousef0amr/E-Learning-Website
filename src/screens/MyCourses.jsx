import React from 'react'
import { useGetUserEnrollmentsQuery } from '../features/slices/enrollmentSlice'
import { Col, Container, Row } from 'react-bootstrap'
import Loader from '../components/common/Loader'
import { CourseCard } from '../components/course/CourseCard'
import SectionTitle from '../components/common/SectionTitle'
import RefreshComponent from '../components/common/RefreshComponent'
import { Footer } from '../components/common/Footer'
import { useTranslation } from 'react-i18next'
import AppStrings from '../utils/appStrings'
const MyCourses = () => {
    const { data, isLoading, isError, refetch } = useGetUserEnrollmentsQuery()
    const { t } = useTranslation()
    return (
        < >
            <div >
                <SectionTitle title={t(AppStrings.courses_for_you)} />
                {
                    isLoading ? <Loader /> :
                        isError ? <RefreshComponent refetch={refetch} /> :
                            data && data?.data?.enrollments?.length > 0 ?
                                <Container style={{ minHeight: '80vh', marginBottom: '50px' }}>

                                    <Row md={3} sm={2} xs={1} xl={3} style={{ direction: 'rtl' }} >
                                        {
                                            data?.data?.enrollments.map((enroll) => {
                                                return (
                                                    <Col key={enroll.course.course_id}>
                                                        <CourseCard course={enroll.course} enrollment_id={enroll.enrollment_id} isEnrolled={true} />
                                                    </Col>
                                                );
                                            }
                                            )
                                        }
                                    </Row>
                                </Container> : <div style={{ minHeight: '60vh', }} className='d-flex  align-items-center justify-content-center text-center fs-4'>{t(AppStrings.no_courses)}</div>
                }
            </div>


            <Footer />


        </>

    )
}

export default MyCourses
