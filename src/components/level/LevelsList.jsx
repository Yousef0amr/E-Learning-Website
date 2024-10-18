import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LevelCard } from './LevelCard'
import { SOURCEURL } from '../../api/endpoints'
import background from './../../assets/level.jpg'

const LevelsList = ({ levels }) => {
    return (
        <Row sm={1} xs={1} md={2} lg={3}>
            {levels.map((level) => (

                <Col key={level.level_id} lg={4} md={4} sm={12} >
                    <Link to={`/years/${level.level_id}`}>
                        <LevelCard image={SOURCEURL + level.poster_url} title={level.name} subTitle={level.description} />
                    </Link>
                </Col>

            ))}
        </Row>
    )
}

export default LevelsList
