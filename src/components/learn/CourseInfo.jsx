import React from 'react'
import { SOURCEURL } from '../../api/endpoints'

const CourseInfo = ({ course }) => {
    return (
        <div className='course-info'>
            <div className='course-img'><img src={SOURCEURL + course.poster_url} alt="" style={{ width: '100%' }} /></div>
            <div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
            </div>
        </div>
    )
}

export default CourseInfo
