import { faClose, faListCheck, faUserAlt, faUserSecret, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import AppStrings from '../../utils/appStrings'



const UserMenu = () => {
    const location = useLocation();
    const { t } = useTranslation()



    const MenuList = [
        {
            title: t(AppStrings.my_account),
            icon: faUserAlt,
            route: 'my-account',
            color: 'var(--question-color-2)'

        },
        {
            title: t(AppStrings.my_wallet),
            icon: faCreditCard,
            route: 'my-wallet',
            color: 'var(--question-color-4)'
        },
        {
            title: t(AppStrings.invoices),
            icon: faListCheck,
            route: 'my-invoices',
            color: 'var(--question-color-3)'
        },
        {
            title: t(AppStrings.change_password),
            icon: faUserSecret,
            route: 'change-password',
            color: 'black'

        },
        {
            title: t(AppStrings.close_account),
            icon: faClose,
            route: 'close-account',
            color: 'var(--question-color-1)'

        },


    ]

    return (

        <Row className="align-items-center justify-content-start" >
            {
                MenuList.map((menu, index) => (

                    <Col key={index} lg={12} md={3} xs={12}>
                        <Link to={menu.route}  >
                            <li className={"user-menu-item " + (location.pathname === '/profile/' + menu.route ? ' user-active-item' : '')}  >
                                <span className="rounded-pill">
                                    <FontAwesomeIcon icon={menu.icon} color={menu.color} />
                                </span>
                                <h6 className="mb-0">{menu.title}</h6>

                            </li>
                        </Link>
                    </Col>

                ))
            }
        </Row>
    )
}

export default UserMenu
