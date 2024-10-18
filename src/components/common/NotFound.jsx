import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'
const NotFound = () => {
    const { t } = useTranslation()
    return (
        <div className='not-found'>
            <p>
                404 - Not Found
            </p>
            <p>الصفحة المطلوبة لا يمكن العثور عليه</p>
            <Button className='btn-danger'>
                <Link to={'/'} className='text-white'>
                    {t(AppStrings.home)}
                </Link>
            </Button>

        </div>
    )
}

export default NotFound
