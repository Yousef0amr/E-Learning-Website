import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { SOURCEURLVIDEO } from '../../api/endpoints';
import Loader from '../common/Loader';
import { useUpdateWatchLessonVideoMutation } from '../../features/slices/courseSlice';


const Arabic = {
    'Current time': 'الوقت الحالي',
    'Disable captions': 'إيقاف الترجمة',
    'Enable captions': 'تشغيل الترجمة',
    'Enter Fullscreen': 'وضع ملء الشاشة',
    'Enter PiP': 'وضع صورة في صورة',
    'Exit Fullscreen': 'الخروج من ملء الشاشة',
    'Exit PiP': 'الخروج من وضع صورة في صورة',
    'Go back to previous menu': 'العودة إلى القائمة السابقة',

    Ad: 'إعلان',
    AirPlay: 'إيربلاي',
    All: 'الكل',
    Audio: 'الصوت',
    Auto: 'تلقائي',
    Buffered: 'تم التخزين المؤقت',
    Captions: 'الترجمة',
    Default: 'افتراضي',
    Disabled: 'معطل',
    Download: 'تنزيل',
    Duration: 'المدة',
    Enabled: 'مفعل',
    End: 'النهاية',
    Forward: 'التقديم السريع',
    LIVE: 'مباشر',
    Loop: 'التكرار',
    Mute: 'كتم الصوت',
    Normal: 'عادي',
    Pause: 'إيقاف مؤقت',
    Play: 'تشغيل',
    Played: 'تم التشغيل',
    Quality: 'الجودة',
    Reset: 'إعادة تعيين',
    Restart: 'إعادة التشغيل',
    Rewind: 'الإرجاع',
    Seek: 'التنقل',
    Settings: 'الإعدادات',
    Speed: 'السرعة',
    Start: 'البدء',
    Unmute: 'إلغاء كتم الصوت',
    Volume: 'مستوى الصوت',
};

export const Video = ({ videoLink, username, phone }) => {
    const [position, setPosition] = useState({ top: '10px', left: '100px' });
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);
    const videoRef = useRef(null);
    const [updateWatchLessonVideo, { isLoading }] = useUpdateWatchLessonVideoMutation();

    const getRandomPosition = useCallback(() => {
        const top = `${Math.floor(Math.random() * 80)}%`;
        const left = `${Math.floor(Math.random() * 80)}%`;
        return { top, left };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setPosition(getRandomPosition());
            }, 300000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying]);


    const handleWatchVideo = useCallback(async () => {
        try {
            const result = await updateWatchLessonVideo({ enrollmentId: 1, lessonId: 2, courseId: 1 }).unwrap();
            console.log(result);
        } catch (error) {
            console.error(error);
        }

    }, [updateWatchLessonVideo]);

    useEffect(() => {
        const videoElement = videoRef.current;
        let animationFrameId;
        let isCalled = false;

        const updateProgress = async () => {
            if (videoElement && !videoElement.paused) {
                const currentTime = videoElement.currentTime;
                const duration = videoElement.duration;
                const percentage = (currentTime / duration) * 100;

                if (percentage.toFixed(0) > 70) {
                    cancelAnimationFrame(animationFrameId);
                    await handleWatchVideo();
                    isCalled = true;
                }

                if (!isCalled) {
                    animationFrameId = requestAnimationFrame(updateProgress);
                }
            }
        };

        const onPlay = () => {
            animationFrameId = requestAnimationFrame(updateProgress);
        };

        const onPause = () => {
            cancelAnimationFrame(animationFrameId);
        };



        if (videoElement) {
            videoElement.addEventListener('play', onPlay);
            videoElement.addEventListener('pause', onPause);

        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('play', onPlay);
                videoElement.removeEventListener('pause', onPause);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, [videoRef, handleWatchVideo]);



    return (
        <div className='video' style={{}}>
            {
                !videoLink ?
                    <div className='d-flex align-items-center justify-content-center gap-2'>
                        <Loader />
                    </div>

                    : <MediaPlayer
                        style={{ position: 'relative', borderRadius: '0' }}
                        autoPlay
                        ref={videoRef}
                        playsInline
                        src={`${SOURCEURLVIDEO}${videoLink}.mp4`}
                        onContextMenu={(e) => e.preventDefault()}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}

                    >
                        <MediaProvider />
                        <PlyrLayout icons={plyrLayoutIcons} translations={Arabic} />

                        {/* Overlay with dynamic position */}
                        <div
                            style={{
                                position: 'absolute',
                                top: position.top,
                                left: position.left,
                                zIndex: 1,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '5px',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '2px 15px',
                                color: 'white',
                                fontSize: '16px',
                            }}
                            className='d-flex align-items-center justify-content-center gap-2 user-badge'
                        >
                            <span>{username}</span>
                            <span> - </span>
                            <span>{phone}</span>
                        </div>
                    </MediaPlayer>
            }

        </div >
    );
};
