import React from 'react'
import Wave from 'react-wavify'

export const Waves = ({ direction }) => {
    return (



        <Wave
            // fill='url(#gradient)'
            paused={false}

            style={{
                transform: direction,

            }}
            options={{
                height: 2,
                amplitude: 50,
                speed: 0.2,
                points: 5
            }}
            fill='#00c0f0'

        />


    )
}
