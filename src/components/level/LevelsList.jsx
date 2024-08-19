import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LevelCard } from './LevelCard'
import { SOURCEURL } from '../../api/endpoints'

const LevelsList = ({ levels }) => {
    return (
        <Row sm={2} xs={1} md={2} lg={4} style={{ gap: '10px' }}>
            {levels.map((level) => (

                <Col style={{ flexGrow: '1' }} key={level.level_id} >
                    <Link to={`/years/${level.level_id}`}>
                        <LevelCard image={SOURCEURL + level.poster_url} title={level.name} subTitle={level.description} />
                    </Link>
                </Col>

            ))}
        </Row>
    )
}

export default LevelsList
