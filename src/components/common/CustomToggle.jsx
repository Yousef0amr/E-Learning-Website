import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CustomToggle = ({ toggleDrawer }) => {

    return (
        <div className="background" onClick={toggleDrawer} >
            <FontAwesomeIcon icon={faBars} />
        </div>
    )
}

export default CustomToggle
