import React from 'react'
import { Footer } from '../components/common/Footer'
import Invoice from '../components/subscribe/Invoice'
import { useParams } from 'react-router-dom'
import { useGetCourseQuery } from '../features/slices/courseSlice'
import { CourseHeader } from '../components/course/CourseHeader'
import Loader from '../components/common/Loader'

const Subscribe = () => {
    const { id } = useParams()

    const { data, isLoading, isError } = useGetCourseQuery(id)

    return (
        <>
            {
                isLoading ? <Loader /> :
                    isError ? <>error</> :
                        data && data.data.course
                        &&
                        <>
                            <div className='courseDetials'>
                                <CourseHeader course={data.data.course} show={false} />
                            </div>
                            <Invoice course={data.data.course} /> </>
            }

            <Footer />
        </>
    )
}

export default Subscribe
