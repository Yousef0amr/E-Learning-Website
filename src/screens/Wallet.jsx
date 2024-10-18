
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import WalletInfo from '../components/wallet/WalletInfo';
import CodeForm from '../components/wallet/CodeForm';
import PaymentForm from '../components/wallet/PaymentForm';
import { useGetUserProfileQuery } from '../features/slices/authSlice';
import { ToastContainer } from 'react-toastify';

const Wallet = () => {
    const { data } = useGetUserProfileQuery();

    return (
        <>
            <Row >
                <Col lg={12}>
                    <Card className='card-profile bg-primary'>
                        <Card.Body className='card-body-profile'>
                            <WalletInfo wallet={data?.data?.user?.wallet} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col lg={6}>
                    <Card className='card-profile bg-primary'>
                        <Card.Body className='card-body-profile'>
                            <CodeForm />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className='card-profile bg-primary'>
                        <Card.Body className='card-body-profile'>
                            <PaymentForm />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </>
    )
}

export default Wallet
