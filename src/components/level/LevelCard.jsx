import React from 'react'


export const LevelCard = ({ title, image, subTitle }) => {
    return (
        <div className='LevelCard'>
            <img src={image} alt={title} />
            <div className='title'>
                {title}
            </div>
            <div className='subTitle'>
                {subTitle}
            </div>
        </div>
    )
}
