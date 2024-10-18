import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChargingStation } from '@fortawesome/free-solid-svg-icons'
import walletImg from '../../assets/wallet.png'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'
const WalletInfo = ({ wallet }) => {
    const { t } = useTranslation()
    return (
        <Row>
            <Col lg={3} >
                <img style={{ width: '100%' }} src={walletImg} alt="" />
            </Col>
            <Col lg={3} className='d-flex flex-column align-items-center justify-content-center gap-2 fs-5 border border-1 shadow'>

                <p>{t(AppStrings.wallet_balance)}</p>
                <h4 style={{ fontSize: '30px', color: 'var(--question-color-4)', borderRadius: '5px', padding: '10px' }}> {wallet} {t(AppStrings.point)} </h4>
            </Col>
            <Col lg={6} >
                <div style={{ borderRadius: '5px' }} className='mt-1 fs-3 gap-3 d-flex align-items-center justify-content-center'>
                    <FontAwesomeIcon color='var(--question-color-4)' icon={faChargingStation} />
                    <span style={{ color: 'var(--question-color-4)' }}> {t(AppStrings.charge_info)}</span>
                </div>
                <ul style={{ listStyle: 'outside' }} className='mt-2 fs-5'>
                    <li>{t(AppStrings.charge_info_1)}</li>
                    <li>{t(AppStrings.charge_info_2)}</li>

                </ul>
            </Col>
        </Row>
    )
}

export default WalletInfo
