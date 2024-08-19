import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { ServiceCard } from './ServiceCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ServicesList = ({ services }) => {
    return (
        <Row sm={2} xs={1} md={4} lg={5} style={{ gap: '10px' }}  >
            {
                services.map((service, index) =>
                    <Col key={service.title + index} style={{ flexGrow: '1' }} >
                        <ServiceCard title={service.title} icon={<FontAwesomeIcon icon={service.icon} />} />
                    </Col>)
            }
        </Row>
    )
}

export default ServicesList
