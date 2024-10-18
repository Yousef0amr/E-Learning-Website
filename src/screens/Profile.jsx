import React from 'react'
import { Footer } from '../components/common/Footer'
import { Container, Row, Col, Card } from 'react-bootstrap'
import profileLogo from '../assets/logo.png'
import { ToastContainer } from 'react-toastify'

import '../styles/profile.css'
import { Outlet } from 'react-router-dom'
import { useGetUserProfileQuery } from '../features/slices/authSlice'
import UserMenu from '../components/profile/UserMenu'
const Profile = () => {
    const { data, isLoading } = useGetUserProfileQuery()


    return (
        <>
            <Container style={{ marginBottom: '100px' }}>
                <Row >
                    <Col lg={4} className='mb-5'>
                        <Card className='card-profile'>
                            <Card.Body className="text-center card-body-profile">
                                <div className="d-flex flex-column align-items-center">
                                    <img
                                        src={profileLogo}
                                        alt=""
                                        className="p-1"
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                    <div className="mt-3">
                                        <h4 >{data?.data?.user?.userName}</h4>
                                    </div>
                                    <div className="mt-1 fs-5">
                                        <span style={{ color: '#7e8590' }}> {isLoading ? "يتم تحميل البيانات" : data?.data?.user?.email}</span>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <UserMenu />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={8}>
                        <Outlet />
                    </Col>
                    {/* Profile Section */}

                </Row>
            </Container>
            <Footer />
            <ToastContainer />
        </>

    )
}

export default Profile
