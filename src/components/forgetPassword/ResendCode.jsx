import React from 'react'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'
const ResendCode = ({ otpPayload, timer, handleResendCode }) => {
    const { t } = useTranslation()
    return (
        <p className="resendNote">
            <span>{t(AppStrings.resend_otp_note)}</span>
            {otpPayload.disabled ? (
                <span> {t(AppStrings.please_wait)} {timer} {t(AppStrings.seconds)} </span>
            ) : (
                <button
                    className="resendBtn"
                    onClick={handleResendCode}
                    type="button"
                    disabled={otpPayload.disabled}
                >
                    {t(AppStrings.resend_otp)}
                </button>
            )}
        </p>
    )
}

export default ResendCode
