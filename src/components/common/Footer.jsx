import React from 'react'
import facebookLogo from './../../assets/facebook.png'
import whatsappLogo from './../../assets/whatsapp.png'
import telegramLogo from './../../assets/telegram.png'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'
export const Footer = () => {
    const { t } = useTranslation()
    return (
        <footer >

            <ul className="socailIcons">
                <li >

                    <img src={facebookLogo} style={{ width: '100%' }} alt='facebook' />
                </li>
                <li>
                    <img src={whatsappLogo} style={{ width: '100%' }} alt='whatsapp' />
                </li>
                <li>
                    <img src={telegramLogo} style={{ width: '100%' }} alt='telegram' />
                </li>
            </ul>
            <p >{t(AppStrings.platform_make_for)}</p>
            <p>{'<Developed By> Yousef Amr <All Copy Rights Reserved @2024>'}</p>
        </footer>
    )
}
