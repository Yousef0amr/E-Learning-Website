import React from 'react'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'

const InvoiceInfo = ({ totalPrice, discount, price }) => {
    const { t } = useTranslation()
    return (
        <>
            <h3 className='invoice-title'>
                {t(AppStrings.invoice_info)}
            </h3>
            <div className='invoice-info-container'>
                <div className='invoice-info'>
                    <span>
                        {t(AppStrings.total_price)}
                    </span>
                    <span>
                        {totalPrice} {t(AppStrings.currency)}
                    </span>
                </div>

                <div className='invoice-info'>
                    <span>
                        {t(AppStrings.discount)}
                    </span>
                    <span>
                        {discount}  {t(AppStrings.currency)}
                    </span>
                </div>
                <div className='invoice-info'>
                    <span>
                        {t(AppStrings.course_price)}
                    </span>
                    <span>
                        {price} {t(AppStrings.currency)}
                    </span>
                </div>
            </div>
        </>
    )
}

export default InvoiceInfo
