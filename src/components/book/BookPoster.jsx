import React from 'react'
import bookPoster from './../../assets/book.jpg'
import SectionTitle from '../common/SectionTitle'
import { Col, Container, Row } from 'react-bootstrap'
import facebookLogo from '../../assets/facebook.png'
import whatsappLogo from '../../assets/whatsapp.png'
import telegramLogo from '../../assets/telegram.png'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'
const BookPoster = () => {
    const { t } = useTranslation()

    return (
        <Container>
            <SectionTitle title={t(AppStrings.book_of_Al_Ghaly)} />
            <Row className='book-poster justify-content-between' md={2} xs={1}     >

                <Col md={1} style={{ boxShadow: 'var(--shadow-effect)', backgroundColor: 'var(--primary-color)', borderRadius: '10px' }}  >
                </Col>
                <Col md={1} style={{ boxShadow: 'var(--shadow-effect)', backgroundColor: 'var(--secondary-color)', borderRadius: '10px' }}  >
                </Col>
                <Col md={1} style={{ boxShadow: 'var(--shadow-effect)', borderRadius: '10px' }}  >
                </Col>
                <Col md={6}  >
                    <div className='book-image'>
                        <img src={bookPoster} alt="book" style={{ width: '100%' }} loading="lazy" />
                    </div>
                </Col>
                <Col md={3} className='p-4'  >
                    <p className='connect fs-5'>
                        {t(AppStrings.you_can_get_book)}
                    </p>
                    <Row className='  p-2 text-center rounded d-flex align-items-center justify-content-center  overflow-auto' md={1} sm={3} >
                        <Col >
                            <img src={facebookLogo} alt="book" style={{ width: '50px', height: '50px', marginBottom: '15px' }} />

                        </Col>
                        <Col >
                            <img src={whatsappLogo} alt="book" style={{ width: '50px', height: '50px', marginBottom: '15px' }} />

                        </Col>
                        <Col >
                            <img src={telegramLogo} alt="book" style={{ width: '50px', height: '50px', marginBottom: '15px' }} />

                        </Col>
                    </Row>
                </Col>

            </Row>
        </Container>

    )
}

export default BookPoster