import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { CourseCard } from './CourseCard'
const CoursesList = ({ courses }) => {
    return (
        <Row md={3} sm={2} xs={1} xl={4} >
            {
                courses.map((course) => (
                    <Col key={course.course_id}>
                        <CourseCard
                            course={course}
                            isEnrolled={false}
                        />
                    </Col>
                ))
            }

        </Row>
    )

}

export default CoursesList
