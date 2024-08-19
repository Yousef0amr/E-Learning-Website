import React from 'react'
import './../../styles/services.css'
import { Container } from 'react-bootstrap'
import { faListCheck, faRepeat, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import SectionTitle from '../common/SectionTitle';
import ServicesList from './ServicesList';

const services = [
    {
        title: 'امتحانات و  واجبات تفاعلية',
        icon: faListCheck
    },
    {
        title: 'متابعة دورية و مستمرة',
        icon: faRepeat
    },
    {
        title: 'توفير للوقت و المجهود',
        icon: faStopwatch
    },
    {
        title: 'توفير للوقت و المجهود',
        icon: faStopwatch
    },
]

export const Services = () => {
    return (
        <Container className='service'>
            <SectionTitle title="الخدمات يا غالي" />
            <ServicesList services={services} />
        </Container>
    )
}

