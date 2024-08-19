import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ModalDialog from '../common/ModalDialog'
import './../../styles/invoices.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetCouponByCodeMutation } from '../../features/slices/couponSlice'
import CouponForm from './CouponForm'
import { faCreditCard, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import notification from '../../utils/toastNotify'
import InvoiceInfo from './InvoiceInfo'
import { useGenerateInvoiceMutation } from '../../features/slices/paymentSlice'

const Invoice = ({ course }) => {
    const [getCouponByCode] = useGetCouponByCodeMutation()
    const [discount, setDiscount] = useState(0)
    const [open, setOpen] = useState(false)
    const [generateInvoice, { isLoading }] = useGenerateInvoiceMutation()

    const onSubmit = async (code) => {
        try {
            const { data } = await getCouponByCode(code).unwrap()
            if (data.coupon) {
                if (course.course_id === data.coupon.course_id && new Date(data.coupon.expiry_date).getTime() > Date.now()) {
                    const calcDiscount = (+course.price * +data.coupon.discountPercentage) / 100
                    setDiscount(calcDiscount)
                    notification('success', 'تم تطبيق الكوبون بنجاح')
                }
            }
            notification('info', 'لم يتم تطبيق الكوبون ')
        } catch (error) {
            notification('error', '', error)
        }
    }

    const totalPrice = +(course.price) - discount

    const orderData = {
        price: totalPrice,
        title: course.title,
        description: course.description,
        course_id: course.course_id
    }

    const handleOnSubmit = async () => {
        try {
            const { data } = await generateInvoice(orderData).unwrap()
            if (data.invoiceUrl) {
                window.location.href = data.invoiceUrl
            }
        } catch (error) {
            notification('error', '', error)
        }
    }

    return (
        <Container className='invoice' >
            <Row sm={1} xs={1} md={2} lg={2}  >
                <Col sm={12} xs={12} md={6} lg={5} className='invoice-container'>
                    <InvoiceInfo price={course.price} discount={discount} totalPrice={totalPrice} />
                </Col>
                <Col sm={12} xs={12} md={6} lg={7} className='invoice-container' >
                    <div className='coupon'>
                        <span className='coupon-title' >
                            هل لديك كوبون؟
                            <span>انسخه ألان</span>
                        </span>
                        <CouponForm onSubmit={onSubmit} />
                    </div>
                    <div className='pay-options'>
                        <Button className='pay-with-wallet'>
                            أو أشترك عبر المحفظة
                        </Button>
                        <Button className='pay-with-card' onClick={() => { setOpen(true) }} >
                            الذهاب للدفع
                            <FontAwesomeIcon icon={faCreditCard} />
                        </Button>
                    </div>
                </Col>
            </Row>
            <ModalDialog open={open} onClose={() => { setOpen(false) }} >
                <div className='subscribe-conditions'>
                    <FontAwesomeIcon icon={faExclamationCircle} className='subscribe-icon' />
                    <p className='subscribe-title'>شروط الاشتراك فى الكورس</p>
                    <p >الكورس متاح لشخص واحد فقط ولا يجوز مشاركته مع طالب اخر</p>
                    <div className='subscribe-buttons'>
                        <Button onClick={() => { setOpen(false) }} className='close' >الغاء</Button>
                        <Button onClick={() => handleOnSubmit()} className='next' >أوافق علي الشروط</Button>
                    </div>
                </div>



            </ModalDialog>
        </Container>

    )
}

export default Invoice
