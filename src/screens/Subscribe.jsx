import React from 'react';
import { Footer } from '../components/common/Footer';
import Invoice from '../components/subscribe/Invoice';
import { useParams } from 'react-router-dom';
import { useGetCourseQuery } from '../features/slices/courseSlice';
import { CourseHeader } from '../components/course/CourseHeader';
import Loader from '../components/common/Loader';
import RefreshComponent from '../components/common/RefreshComponent';

const Subscribe = () => {
    const { courseId } = useParams();

    const { data, isLoading, isError, refetch } = useGetCourseQuery(courseId);

    return (
        <>
            {
                isLoading ? <Loader /> :
                    isError ? <RefreshComponent refetch={refetch} /> :
                        data && data?.data?.course
                        &&
                        <>
                            <div className='courseDetials'>
                                <CourseHeader course={data?.data?.course} show={false} />
                            </div>
                            <Invoice course={data?.data?.course} /> </>
            }

            <Footer />
        </>
    );
};

export default Subscribe;
