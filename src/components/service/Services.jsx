import React from 'react'
import './../../styles/services.css'
import { Container } from 'react-bootstrap'
import { faListCheck, faRepeat, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import SectionTitle from '../common/SectionTitle';
import ServicesList from './ServicesList';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';


export const Services = () => {
    const { t } = useTranslation()

    const services = [
        {
            title: t(AppStrings.quizzes_and_interactions),
            icon: faListCheck
        },
        {
            title: t(AppStrings.follow_and_continue),
            icon: faRepeat
        },
        {
            title: t(AppStrings.save_time_and_effort),
            icon: faStopwatch
        },

    ]
    return (
        <Container className='service'>
            <SectionTitle title={t(AppStrings.services)} />
            <ServicesList services={services} />
        </Container>
    )
}

