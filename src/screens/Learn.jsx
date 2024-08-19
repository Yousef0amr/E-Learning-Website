import React, { useEffect, useState } from 'react'
import './../styles/learn.css'
import Accordion from 'react-bootstrap/Accordion';
import { Video } from '../components/learn/Video';
import { Footer } from '../components/common/Footer';
import { useParams } from 'react-router-dom';
import { useGetEnrollmentCourseQuery } from '../features/slices/enrollmentSlice';
import Loader from '../components/common/Loader';
import { SOURCEURL } from '../api/endpoints';
export const Learn = () => {
    const { enrollmentId } = useParams()
    const { data, isLoading, isError, error } = useGetEnrollmentCourseQuery(enrollmentId)
    const [activeIndex, setActiveIndex] = useState(null);
    const [video, setVideo] = useState(null);


    const handleOnItemClick = (index, videoLink) => {
        setVideo(videoLink)
        setActiveIndex(index);
    }

    useEffect(() => {
        if (!isLoading) {
            if (!isError) {
                setVideo(data.data.enrollment.course.sections[0].lessons[0].videos[0].video_url)
                setActiveIndex(data.data.enrollment.course.sections[0].lessons[0].lesson_id)
            }
        }
    }, [isLoading])

    console.log(error)
    return (
        isLoading ? <Loader /> :
            isError ? <>error</> :
                data && <div className='learn'>
                    <div className='course'>
                        <Video videoLink={SOURCEURL + video} />
                        <div>

                        </div>
                        <Footer />
                    </div>


                    <div className='play-list'>
                        <div className='play-list-header'>
                            <span>محتوي الكورس</span>
                        </div>
                        <div className='play-list-content'>
                            {
                                data.data.enrollment.course.sections.map((section) => <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            {
                                                section.title

                                            }
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul className='lectures'>
                                                {
                                                    section.lessons.map((lesson) =>
                                                        <li onClick={() => handleOnItemClick(lesson.lesson_id
                                                            , lesson.videos[0].video_url)}
                                                            className={activeIndex === lesson.lesson_id ? 'lecture-active' : ''}>
                                                            <span>{lesson.title}</span>
                                                            <span className='time'> {lesson.videos[0].duration} دقائق</span>
                                                        </li>)
                                                }

                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>)
                            }

                        </div>
                    </div>
                </div>

    )
}



