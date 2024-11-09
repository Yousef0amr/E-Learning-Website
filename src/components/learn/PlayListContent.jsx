import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
const PlayListContent = ({ sections, activeIndex, handleOnItemClick }) => {
    const navigate = useNavigate();

    const handleLessonClick = (lesson) => {
        handleOnItemClick(lesson.lesson_id, lesson.videos[0].video_url);
        navigate(`?lessonId=${lesson.lesson_id}`);
    };

    const activeCompoenent = (lesson) => <li key={lesson.lesson_id} onClick={() => handleLessonClick(lesson)}
        className={activeIndex === lesson.lesson_id ? 'lecture-active' : ''}>
        <span>{lesson.title}</span>
        <span className='time'> {Math.floor(lesson.videos[0].duration / 60) <= 0 ? '' : `${Math.floor(lesson.videos[0].duration / 60)}  س `}    {Number(lesson.videos[0].duration).toFixed(0) % 60}  د</span>
    </li>;
    return (
        <div className='play-list-content'>
            {
                sections.map((section) => <Accordion key={section.section_id}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            {

                                section.title
                            }
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul className='lectures'>
                                {
                                    section.lessons.map((lesson, index, arr) => {
                                        return index === 0 ? activeCompoenent(lesson) : arr[index - 1]?.quizzes[0]?.quiz_id ? arr[index - 1]?.quizzes[0]?.quizResults[0]?.score < 50
                                            ? <li
                                                className='lecture-inactive'
                                                key={lesson.lesson_id}
                                            >
                                                <span>{lesson.title}</span>
                                                <span className='time'> {Math.floor(lesson.videos[0].duration / 60)}س   {Math.floor(lesson.videos[0].duration) % 60}  د</span>
                                            </li> : activeCompoenent(lesson) : activeCompoenent(lesson);
                                    }
                                    )
                                }
                            </ul>


                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>)
            }

        </div>
    );
};

export default PlayListContent;
