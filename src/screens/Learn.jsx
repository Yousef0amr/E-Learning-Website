import React, { useEffect, useState } from 'react'
import './../styles/learn.css'

import { Video } from '../components/learn/Video';
import { Footer } from '../components/common/Footer';
import { Link, useParams } from 'react-router-dom';
import { useGetEnrollmentCourseQuery } from '../features/slices/enrollmentSlice';
import Loader from '../components/common/Loader';
import { SOURCEURL } from '../api/endpoints';
import PlayList from '../components/learn/PlayList';
import CourseTabs from '../components/learn/CourseTabs';
import Quiz from './Quiz';
import Note from '../components/learn/Note';
import PlayListContent from '../components/learn/PlayListContent';
import CourseInfo from '../components/learn/CourseInfo';
import RefreshComponent from '../components/common/RefreshComponent';

export const Learn = () => {
    const { enrollmentId } = useParams();
    const { data, isLoading, isError, refetch } = useGetEnrollmentCourseQuery(enrollmentId);

    const [lesson, setLesson] = useState({
        activeLesson: null,
        videoUrl: null
    });

    const handleOnItemClick = (lesson, videoLink) => {
        const selectedItem = {
            activeLesson: lesson,
            videoUrl: videoLink
        };
        setLesson(selectedItem);
    };

    useEffect(() => {
        if (!isLoading) {
            if (!isError) {
                const selectedItem = {
                    activeLesson: data?.data?.enrollment?.course?.sections[0]?.lessons[0]?.lesson_id,
                    videoUrl: data?.data?.enrollment?.course?.sections[0]?.lessons[0]?.videos[0]?.video_url
                };
                setLesson(selectedItem);

            }
        }
    }, [isLoading]);






    return (
        <div className='learn-container'>
            {
                isLoading ? <Loader /> :
                    isError ? <RefreshComponent refetch={refetch} /> :
                        data && <div className='learn'>
                            <div className='course'>
                                <Video videoLink={SOURCEURL + lesson.videoUrl} />
                                <CourseTabs tabs={[
                                    <CourseInfo course={data?.data?.enrollment?.course} />,
                                    <PlayListContent sections={data?.data?.enrollment?.course?.sections} activeIndex={lesson.activeLesson} handleOnItemClick={handleOnItemClick} />,
                                    <Quiz lessonId={lesson.activeLesson} />,
                                    <Note lessonId={lesson.activeLesson} />,
                                    null
                                ]} />
                                <Footer />
                            </div>
                            <PlayList sections={data?.data?.enrollment?.course?.sections} activeIndex={lesson.activeLesson} handleOnItemClick={handleOnItemClick} />
                        </div>
            }
        </div>
    );
};



