import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
const SpinnerLoader = () => {
    return (

        <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
        />

    )
}

export default SpinnerLoader
