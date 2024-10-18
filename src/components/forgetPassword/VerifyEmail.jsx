

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useResendCodeMutation, useVerifyEmailMutation } from '../../features/slices/authSlice';
import OtpInput from 'react-otp-input';
import notitifation from '../../utils/toastNotify';
import { useNavigate } from 'react-router-dom';
import ResendCode from './ResendCode';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
const VerifyEmail = ({ email, payload, choice, handleClose }) => {
    const { handleSubmit } = useForm();
    const [resendCode] = useResendCodeMutation();
    const [verifyEmail] = useVerifyEmailMutation();
    const navigate = useNavigate();

    const { t } = useTranslation()


    const [otp, setOtp] = useState('');
    const [otpPayload, setOtpPayload] = useState({
        disabled: false,
        secret: payload
    });
    const [timer, setTimer] = useState(120);


    useEffect(() => {
        let interval = null;
        if (otpPayload && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setOtpPayload(prev => ({ disabled: false, ...prev }));
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timer, otpPayload]);

    const handleResendCode = async () => {
        try {
            const result = await resendCode({ email }).unwrap();
            if (result.data.secret) {
                setTimer(120);
                setOtpPayload(prev => ({ disabled: true, secret: result.data.secret }));
            }
        } catch (error) {
            notitifation('error', t(AppStrings.failed_to_send), error);
        }
    };


    const onSubmit = async () => {
        try {
            if (otp.length === 6) {
                const result = await verifyEmail({ secret: otpPayload.secret, token: otp }).unwrap();
                if (result.data.isVerified)
                    choice ? navigate('/reset-password', { state: { isVerified: true, email } }) : handleClose();

            }
        }
        catch (error) {
            notitifation('error', t(AppStrings.failed_to_verify), error);
        }

    };

    return (
        <form className="otp-Form" onSubmit={handleSubmit(onSubmit)}>
            <span className="mainHeading">{t(AppStrings.otp_heading)}</span>
            <p className="otpSubheading">{t(AppStrings.otp_description)}</p>

            <div className="inputContainer">

                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    inputStyle="otp-input"
                    shouldAutoFocus={true}
                    type="number"
                    numInputs={6}
                    renderSeparator={<span style={{ margin: '0 5px' }}> </span>}
                    renderInput={(props) => <input
                        required={true}
                        type="number"
                        {...props}
                    />}
                />

            </div>

            <button className="verifyButton" type="submit">{t(AppStrings.otp_verify)}</button>

            <ResendCode otpPayload={otpPayload} timer={timer} handleResendCode={handleResendCode} />
        </form>
    );
};

export default VerifyEmail;
