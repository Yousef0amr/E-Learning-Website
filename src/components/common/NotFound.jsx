import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='not-found'>
            <p>
                404 - Not Found
            </p>
            <p>الصفحة المطلوبة لا يمكن العثور عليه</p>
            <Button className='btn-danger'>
                <Link to={'/'} className='text-white'>
                    الصفحة الرئيسية
                </Link>
            </Button>

        </div>
    )
}

export default NotFound
