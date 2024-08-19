import React from 'react'

export const ServiceCard = ({ title, icon }) => {
    return (
        <div className='cardService'>
            <div className='cardIcon'>
                {icon}
            </div>
            <span className='cardTitle'>
                {title}
            </span>
        </div>
    )
}
