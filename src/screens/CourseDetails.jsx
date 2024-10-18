import React from 'react'

import { CourseHeader } from '../components/course/CourseHeader';
import { CourseContent } from '../components/course/CourseContent';
import { useGetCourseQuery } from '../features/slices/courseSlice';
import { useParams } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { Container } from 'react-bootstrap';
import { Footer } from '../components/common/Footer';
import RefreshComponent from './../components/common/RefreshComponent';

export const CourseDetails = () => {
    const { courseId } = useParams()
    const { data, isLoading, isError, refetch } = useGetCourseQuery(courseId)

    return (
        <>
            {
                isLoading ? <Loader /> :
                    isError ? <RefreshComponent refetch={refetch} /> :
                        data && data.data.course
                        && <div className='courseDetials'>
                            <CourseHeader course={data.data.course} show={true} />
                            <Container style={{ marginTop: '100px', marginBottom: '50px', minHeight: '50vh' }}  >
                                <CourseContent sections={data.data.course.sections} />
                            </Container>
                        </div>
            }
            <Footer />
        </>

    )
}
