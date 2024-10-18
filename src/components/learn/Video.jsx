import React, { useEffect, useRef } from 'react';
import { BigPlayButton, LoadingSpinner, Player } from 'video-react';
import "./../../../node_modules/video-react/dist/video-react.css";

export const Video = ({ videoLink, onTimeUpdate }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        const videoElement = playerRef.current?.video?.video;

        if (playerRef.current) {
            playerRef.current.load();
        }

        const handleContextMenu = (event) => {
            event.preventDefault();
        };



        if (videoElement) {
            videoElement.addEventListener('contextmenu', handleContextMenu);

        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('contextmenu', handleContextMenu);

            }
        };
    }, [videoLink]);

    return (
        <div className='video'>
            <Player ref={playerRef} src={videoLink} autoPlay>
                <BigPlayButton position="center" />
                <LoadingSpinner />
            </Player>
        </div>
    );
};
