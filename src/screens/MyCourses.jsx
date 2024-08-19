import React from 'react'
import { useGetUserEnrollmentsQuery } from '../features/slices/enrollmentSlice'
import { Col, Container, Row } from 'react-bootstrap'
import Loader from '../components/common/Loader'
import { CourseCard } from '../components/course/CourseCard'
import SectionTitle from '../components/common/SectionTitle'
import { Header } from '../components/header/Header'
import { Footer } from '../components/common/Footer'
const MyCourses = () => {
    const { data, isLoading, isError, error } = useGetUserEnrollmentsQuery()
    console.log(data)


    return (
        <>

            <Header />

            {
                isLoading ? <Loader /> :
                    isError ? <>error</> :
                        data &&
                        <Container>

                            <SectionTitle title={"كورساتك يا غالي"} />


                            <Row md={3} sm={2} xs={1} xl={4} >
                                {
                                    data.data.enrollments.map((enroll) => {

                                        return (
                                            <Col key={enroll.course.course_id}>

                                                <CourseCard course={enroll.course} enrollment_id={enroll.enrollment_id} isEnrolled={true} />



                                            </Col>
                                        )
                                    }

                                    )
                                }

                            </Row>

                        </Container>
            }
            <Footer />

        </>
    )
}

export default MyCourses
