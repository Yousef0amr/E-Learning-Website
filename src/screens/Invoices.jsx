import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { useGetAllInvoicesQuery } from '../features/slices/paymentSlice'
import Loader from '../components/common/Loader'

import invoice from '../assets/invoice.png'
import RefreshComponent from '../components/common/RefreshComponent'
import { useTranslation } from 'react-i18next'
import AppStrings from '../utils/appStrings'
const Invoices = () => {
    const { data, isLoading, isError, refetch } = useGetAllInvoicesQuery()
    const { t } = useTranslation()


    console.log(data)

    return (
        <>
            <Row >
                <Col lg={12}>
                    <Card className='card-profile bg-primary'>
                        <Card.Body className='card-body-profile'>
                            <Row >
                                <Col lg={4} className='d-flex justify-content-center align-items-center gap-3'>
                                    <img src={invoice} alt="invoice" style={{ width: '100px', height: '100px' }} />
                                    <h3 className='text-center'>{t(AppStrings.invoices)}</h3>
                                </Col>
                                <Col lg={6}>
                                </Col>
                                <Col lg={2}>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {
                isLoading ? <Loader /> :
                    isError ? <RefreshComponent refetch={refetch} /> :

                        <Row className='mt-3'>
                            <Col lg={12}>
                                <Card className='card-profile bg-primary'>
                                    <Card.Body className='card-body-profile'>
                                        <Table striped bordered hover responsive className='text-center fs-5'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th> {t(AppStrings.invoice_number)}</th>
                                                    <th> {t(AppStrings.invoice_date)}</th>
                                                    <th> {t(AppStrings.payment_method)} </th>
                                                    <th>{t(AppStrings.amount)}</th>
                                                    <th>{t(AppStrings.status)}</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    data && data.data.payments.length > 0 ? data.data.payments.map((payment, index) => <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{payment.order_id}</td>
                                                        <td>{new Date(payment.payment_date).toISOString().split('T')[0]}</td>
                                                        <td>{payment.payment_method}</td>
                                                        <td>{payment.amount}</td>
                                                        <td>{payment.status ? t(AppStrings.paid) : t(AppStrings.unpaid)}</td>
                                                    </tr>) : <tr className='fs-5 mt-3 text-center'>
                                                        <td colSpan={6}>{t(AppStrings.no_invoices)} </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
            }
        </>
    )
}

export default Invoices
