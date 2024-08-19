import React from 'react'

const InvoiceInfo = ({ totalPrice, discount, price }) => {
    return (
        <>
            <h3 className='invoice-title'>
                الفاتورة
            </h3>
            <div className='invoice-info-container'>
                <div className='invoice-info'>
                    <span>
                        الاجمالي
                    </span>
                    <span>
                        {totalPrice} جنيهًا
                    </span>
                </div>

                <div className='invoice-info'>
                    <span>
                        الخصم
                    </span>
                    <span>
                        {discount} جنيهًا
                    </span>
                </div>
                <div className='invoice-info'>
                    <span>
                        سعر الكورس
                    </span>
                    <span>
                        {price}جنيهًا
                    </span>
                </div>
            </div>
        </>
    )
}

export default InvoiceInfo
