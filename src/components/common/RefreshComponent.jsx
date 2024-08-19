import React from 'react'

const RefreshComponent = ({ refetch }) => {
    return (
        <div className='error'>
            <p >حدث خطأ</p>
            <button onClick={() => refetch()}>اعادة التحميل</button>
        </div>
    )
}

export default RefreshComponent
