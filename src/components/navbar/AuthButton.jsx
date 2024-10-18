import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'
const AuthButton = () => {
    const { t } = useTranslation()
    return (
        <div className="auth-buttons">
            <Link to="/login">
                <Button className="auth-login">
                    {t(AppStrings.login)}  <FontAwesomeIcon icon={faArrowRightFromBracket} color="#ff4b2bbb" />
                </Button>
            </Link>
            <Link to="/sign-up">
                <Button className="auth-signUp">{'!'}  {t(AppStrings.sign_up)}</Button>
            </Link>
        </div>
    )
}

export default AuthButton
