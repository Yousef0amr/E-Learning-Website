import React from 'react';

import { Link } from 'react-router-dom';
import { SOURCEURL } from '../../api/endpoints';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';


export const CourseHeader = ({ course, show }) => {
    const { t } = useTranslation();
    return (

        <div className='courseheader'>

            <div className='overview' style={{ zIndex: '2', maxWidth: '100%' }}>

                <h3 className='title'>
                    {course.title}
                </h3>
                <p className='description'>{course.description}</p>
            </div>
            {
                show && <div className='cardHeader'>

                    <img src={SOURCEURL + course.poster_url} alt={''} loading="lazy" />
                    <div className='cardBody'>
                        {
                            course.enrollments[0] ? <> <Link to={`/course/${course.course_id}/learn/${course.enrollments[0].enrollment_id}`}>
                                <div className='add'  >
                                    {t(AppStrings.watch_course)}
                                </div>
                            </Link></> : <>
                                <span className='price'>
                                    {course.price}
                                    <span>
                                        {t(AppStrings.currency)}
                                    </span>
                                </span>
                                <Link to={'subscribe/invoice'}>
                                    <div className='add'  >
                                        {t(AppStrings.subscribe)}
                                    </div>
                                </Link>
                            </>
                        }
                    </div>
                </div>
            }
        </div >
    )
}
