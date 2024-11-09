import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'
const RefreshComponent = ({ refetch }) => {
    const { t } = useTranslation()

    return (
        <div className='error  text-center mb-5  p-5 rounded'>
            <Button className='btn-danger  fs-5' onClick={() => refetch()}>{t(AppStrings.refresh)} </Button>
            <p className='fs-5 text-danger mt-3'>{t(AppStrings.try_later)}</p>
        </div>
    )
}

export default RefreshComponent
