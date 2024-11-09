import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { CourseCard } from './CourseCard'
const CoursesList = ({ courses }) => {

    return (
        <Row lg={3} md={3} sm={2} xs={1} xl={3} >
            {
                courses.map((course) => (
                    <Col key={course.course_id}>
                        <CourseCard
                            course={course}
                            isEnrolled={false}
                            enrollment_id={course?.enrollments[0]?.enrollment_id}
                        />
                    </Col>
                ))
            }

        </Row>
    )

}

export default CoursesList
