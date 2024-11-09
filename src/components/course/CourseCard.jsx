
import React from 'react'
import { Link } from 'react-router-dom'
import { SOURCEURLIMAGE } from '../../api/endpoints'
import { Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'

export const CourseCard = ({ course, isEnrolled, ...props }) => {
    const { t } = useTranslation()
    return (

        <Card className="card-course">
            <Link to={isEnrolled ? `/course/${course.course_id}/learn/${props.enrollment_id}` : `course/${course.course_id}`}>
                <div className="card-img-top" >
                    <img src={SOURCEURLIMAGE + course.poster_url} alt="" loading="lazy" />

                </div>
                <div className="card-body">
                    <h3 className="card-title">{course.title}</h3>
                    <p className="card-text">
                        {course.description}
                    </p>
                </div>
            </Link>

            {
                props.enrollment_id ? <div className="card-footer"> <Link to={`/course/${course.course_id}/learn/${props.enrollment_id}`}>
                    <div className='card-link'  >
                        {t(AppStrings.watch_course)}
                    </div>

                </Link></div> : <div className="card-footer">
                    <span className="price"> {course.price} {t(AppStrings.currency)}</span>
                    <Link to={`course/${course.course_id}/subscribe/invoice`}>
                        <span className="card-link">{t(AppStrings.subscribe)}</span>
                    </Link>

                </div>
            }

        </Card>
    )
}
