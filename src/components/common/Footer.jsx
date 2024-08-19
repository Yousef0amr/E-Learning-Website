import React from 'react'
import { faFacebook, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Footer = () => {
    return (
        <>

            <footer >

                <ul className='socailIcons'>
                    <li>
                        <FontAwesomeIcon icon={faFacebook} />
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faInstagram} />
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faTelegram} />
                    </li>
                </ul>
                <p >تم صنع هذه المنصة بهدف تهيئة الطالب لـ كامل جوانب الثانوية العامة و ما بعدها</p>
                <p>{'<Developed By> Yousef Amr <All Copy Rights Reserved @2024>'}</p>
            </footer>
        </>

    )
}
