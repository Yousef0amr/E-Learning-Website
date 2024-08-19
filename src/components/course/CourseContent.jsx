import React from 'react'
import { Container } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'

export const CourseContent = ({ sections }) => {

    return (
        <Container >
            <div className='courseContent'>
                <span className='title'>محتوي الكورس</span>
                <div className='content'>
                    {
                        sections.map((section) => <Accordion key={section.section_id}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    {section.title}
                                </Accordion.Header>

                                <Accordion.Body>
                                    {
                                        section.lessons.map((lesson, index) => <div key={lesson.lecture_id} className='lesson'>
                                            <div className='lesson-title'>
                                                <span className='lesson-index'>{index + 1}</span>
                                                <div className='lesson-title-text'>
                                                    {lesson.title}
                                                </div>
                                            </div>
                                            <FontAwesomeIcon icon={faVideo} className='lesson-icon' />
                                        </div>

                                        )
                                    }



                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>)
                    }
                </div>
            </div>
        </Container>
    )
}
