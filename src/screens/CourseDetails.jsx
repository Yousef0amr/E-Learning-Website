import React from 'react'

import { CourseHeader } from '../components/course/CourseHeader';
import { CourseContent } from '../components/course/CourseContent';
import { useGetCourseQuery } from '../features/slices/courseSlice';
import { useParams } from 'react-router-dom';
import Loader from '../components/common/Loader';
import CourseGoals from '../components/course/CourseGoals';
import { Container } from 'react-bootstrap';
import { Footer } from '../components/common/Footer';

export const CourseDetails = () => {
    const { id } = useParams()
    const { data, isLoading, isError } = useGetCourseQuery(id)


    return (
        <>
            {
                isLoading ? <Loader /> :
                    isError ? <>error</> :
                        data && data.data.course
                        && <div className='courseDetials'>
                            <CourseHeader course={data.data.course} show={true} />
                            <Container  >
                                <CourseGoals />
                                <CourseContent sections={data.data.course.sections} />
                            </Container>
                        </div>
            }
            <Footer />
        </>

    )
}
