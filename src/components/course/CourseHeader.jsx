import React from 'react'

import { Link } from 'react-router-dom'
import { SOURCEURL } from '../../api/endpoints'

export const CourseHeader = ({ course, show }) => {
    return (

        <div className='courseheader'>


            <div>
                <h3 className='title'>
                    {course.title}
                </h3>
                <p className='description'>{course.description}</p>
            </div>
            {
                show && <div className='cardHeader'>
                    <img src={SOURCEURL + course.poster_url} alt={''} />
                    <div className='cardBody'>
                        {
                            course.enrollments[0] ? <> <Link to={`/course/${course.course_id}/learn/${course.enrollments[0].enrollment_id}`}>
                                <div className='add'  >
                                    مشاهدة الكورس
                                </div>
                            </Link></> : <>
                                <span className='price'>
                                    {course.price}
                                    <span>
                                        جنيهًا
                                    </span>
                                </span>
                                <Link to={'subscribe/invoice'}>
                                    <div className='add'  >
                                        اشترك الان
                                    </div>
                                </Link>
                            </>
                        }


                    </div>
                </div>
            }


        </div>

    )
}
