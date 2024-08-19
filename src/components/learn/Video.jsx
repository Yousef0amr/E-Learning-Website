import React, { useEffect, useRef } from 'react'
import { BigPlayButton, LoadingSpinner, Player } from 'video-react';
import "./../../../node_modules/video-react/dist/video-react.css";

export const Video = ({ videoLink }) => {
    const playerRef = useRef(null);

    useEffect(() => {

        if (playerRef.current) {
            playerRef.current.load();
        }

        const videoElement = playerRef.current.video.video;

        const handleContextMenu = (event) => {
            event.preventDefault();
        };

        videoElement.addEventListener('contextmenu', handleContextMenu);

        return () => {
            videoElement.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [videoLink]);

    return (
        <div className='video'>
            <Player ref={playerRef} src={videoLink} autoPlay>
                <BigPlayButton position="center" />
                <LoadingSpinner />
            </Player>
        </div>
    )
}
