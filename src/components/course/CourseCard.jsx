
import React from 'react'
import { Link } from 'react-router-dom'
import { SOURCEURL } from '../../api/endpoints'

export const CourseCard = ({ course, isEnrolled, ...props }) => {
    const enrollment_id = isEnrolled ? props.enrollment_id : course.enrollments[0].enrollment_id || null
    return (

        <div className="card">
            <Link to={isEnrolled ? `/course/${course.course_id}/learn/${enrollment_id}` : `course/${course.course_id}`}>
                <img src={SOURCEURL + course.poster_url} alt="" className=" card-img-top" />
                <div className="card-body">
                    <h3 className="card-title">{course.title}</h3>
                    <p className="card-text">
                        {course.description}
                    </p>
                </div>
            </Link>
            {
                enrollment_id ? <div className="card-footer"> <Link to={`/course/${course.course_id}/learn/${enrollment_id}`}>
                    <div className='card-link'  >
                        مشاهدة الكورس
                    </div>

                </Link></div> : <div className="card-footer">
                    <span className="price"> {course.price} جنيهًا</span>
                    <Link to={`course/${course.ourse_id}/subscribe/invoice`}>
                        <span className="card-link">اشترك الان</span>
                    </Link>

                </div>
            }

        </div>
    )
}
