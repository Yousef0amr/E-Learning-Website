import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ModalDialog from '../common/ModalDialog';
import './../../styles/invoices.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetCouponByCodeMutation } from '../../features/slices/couponSlice';
import CouponForm from './CouponForm';
import { faCreditCard, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import notification from '../../utils/toastNotify';
import InvoiceInfo from './InvoiceInfo';
import { useGenerateInvoiceMutation, usePayWithWalletMutation } from '../../features/slices/paymentSlice';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import { useNavigate } from 'react-router-dom';
import SpinnerLoader from '../common/Spinner';
import { ToastContainer } from 'react-toastify';

const Invoice = ({ course }) => {
    const [getCouponByCode] = useGetCouponByCodeMutation();
    const [discount, setDiscount] = useState(0);
    const [open, setOpen] = useState({ isOpen: false, type: '' });
    const [generateInvoice, { isLoading }] = useGenerateInvoiceMutation();
    const [payWithWallet, { isLoading: isLoadingWallet }] = usePayWithWalletMutation();
    const navigate = useNavigate();

    const { t } = useTranslation();

    const onSubmit = async (code) => {
        try {
            const { data } = await getCouponByCode(code).unwrap()
            if (data.coupon) {
                if (course.course_id === data.coupon.course_id && new Date(data.coupon.expiry_date).getTime() > Date.now()) {
                    const calcDiscount = (+course.price * +data.coupon.discountPercentage) / 100;
                    setDiscount(calcDiscount);
                    notification('success', t(AppStrings.coupon_applied_successfully));
                }
            }
            notification('info', t(AppStrings.coupon_not_applied));
        } catch (error) {
            notification('error', '', error);
        }
    };


    const handleOnClose = () => {
        setOpen({ isOpen: false, type: '' });
    };

    const totalPrice = +(course.price) - discount;

    const orderData = {
        price: totalPrice,
        title: course.title,
        description: course.description,
        course_id: course.course_id
    };

    const handleOnSubmit = async () => {
        try {
            if (open.type === 'online') {
                const { data } = await generateInvoice(orderData).unwrap();
                if (data.invoiceUrl)
                    window.location.href = data.invoiceUrl;
            }
            if (open.type === 'wallet') {
                handleOnClose();
                const result = await payWithWallet({ amount: totalPrice, course_id: course.course_id }).unwrap();
                if (result.data.isPayed) {
                    notification('success', t(AppStrings.course_purchased_successfully));
                    setTimeout(() => {
                        navigate('/my-courses');
                    }, 1500);
                }
            }
        }
        catch (error) {
            notification('error', t(AppStrings.failed_to_purchase_course), error);
        }
    };

    return (
        <Container className='invoice' >
            <Row sm={1} xs={1} md={2} lg={2}  >
                <Col sm={12} xs={12} md={6} lg={5} className='invoice-container'>
                    <InvoiceInfo price={course.price} discount={discount} totalPrice={totalPrice} />
                </Col>
                <Col sm={12} xs={12} md={6} lg={7} className='invoice-container' >
                    <div className='coupon'>
                        <span className='coupon-title' >
                            {t(AppStrings.apply_coupon)}
                            <span> {t(AppStrings.enter_coupon_code)}</span>
                        </span>
                        <CouponForm onSubmit={onSubmit} />
                    </div>
                    <div className='pay-options'>
                        <Button className='pay-with-wallet' onClick={() => { setOpen({ isOpen: true, type: 'wallet' }); }} disabled={isLoading}>
                            {t(AppStrings.pay_with_wallet)}
                        </Button>
                        <Button className='pay-with-card' onClick={() => { setOpen({ isOpen: true, type: 'online' }); }} disabled={isLoadingWallet} >
                            {t(AppStrings.pay_with_online_payment)}
                            <FontAwesomeIcon icon={faCreditCard} />
                        </Button>
                    </div>
                </Col>
            </Row>
            <ModalDialog open={open.isOpen} onClose={handleOnClose} >
                <div className='subscribe-conditions'>
                    <FontAwesomeIcon icon={faExclamationCircle} className='subscribe-icon' />
                    <p className='subscribe-title'>  {t(AppStrings.terms_and_conditions)} </p>
                    <p className='text-center'>{t(AppStrings.terms_and_conditions_info)}</p>
                    <div className='subscribe-buttons'>
                        <Button onClick={handleOnClose} className='close' >{t(AppStrings.cancel)}</Button>
                        <Button onClick={handleOnSubmit} className='next' >{isLoading || isLoadingWallet ? <SpinnerLoader /> : t(AppStrings.accept_conditions)}</Button>
                    </div>
                </div>
            </ModalDialog>
            <ToastContainer />
        </Container>

    );
};

export default Invoice;
