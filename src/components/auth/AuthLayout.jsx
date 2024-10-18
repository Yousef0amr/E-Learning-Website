import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import loginSvg from '../../assets/loginSvg1.png'

const AuthLayout = ({ title, children }) => {
    return (
        <Container >
            <Row className='login' md={1} sm={1} xs={1} lg={3} >
                <Col className='login-form' lg={5}     >
                    <div className='title'>
                        <span>{title} </span>
                    </div>
                    {
                        children
                    }
                </Col>
                <Col lg={1}></Col>
                <Col lg={6} className='bg-login ' >
                    <img src={loginSvg} alt="login" style={{ width: '100%' }} />
                </Col>

            </Row>

        </Container>

    )
}

export default AuthLayout
