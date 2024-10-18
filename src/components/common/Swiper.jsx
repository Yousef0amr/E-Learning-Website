import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { Pagination, Navigation, Keyboard, Mousewheel, Autoplay } from 'swiper/modules';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
const CustomSwiper = ({ slides, duration, children, close }) => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const { t } = useTranslation()
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <>
            {
                !duration && <Swiper
                    cssMode={true}
                    modules={[Pagination, Navigation, Keyboard, Mousewheel]}
                    pagination={{
                        type: 'fraction',
                    }}
                    className="mySwiper"
                    keyboard={true}
                    mousewheel={true}
                    navigation={
                        {
                            nextEl: '.swiper-next',
                            prevEl: '.swiper-prev',
                        }
                    }
                >
                    {slides.map((slide, index) =>
                        <SwiperSlide key={index}>
                            {slide}
                        </SwiperSlide>
                    )}

                </Swiper>
            }

            {
                duration && <Swiper
                    cssMode={true}
                    modules={[Pagination, Navigation, Keyboard, Mousewheel, Autoplay]}
                    autoplay={{
                        delay: duration,
                        disableOnInteraction: false,
                        stopOnLastSlide: true,


                    }}

                    onSlideChange={(swiper) => {
                        if (swiper.activeIndex === 5) {
                            setTimeout(() => {
                                close();
                            }, duration - 500)

                        }
                    }}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    pagination={{
                        type: 'fraction',
                    }}
                    className="mySwiper"
                    keyboard={true}
                    mousewheel={true}
                    navigation={
                        {
                            nextEl: '.swiper-next',
                            prevEl: '.swiper-prev',
                        }
                    }
                >
                    {slides.map((slide, index) =>
                        <SwiperSlide key={index}>
                            {slide}
                        </SwiperSlide>
                    )}

                    <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>

                </Swiper>
            }


            <div className='swiper-control d-flex justify-content-between gap-3'>

                {children}
                {!duration &&
                    <div className='d-flex gap-3 ' >
                        <Button className='swiper-prev'>{t(AppStrings.previous)}</Button>
                        <Button className='swiper-next'>{t(AppStrings.next)}</Button>
                    </div>
                }


            </div>

        </>
    )
}

export default CustomSwiper
