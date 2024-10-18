import React from "react";
import './../../styles/header.css';
import background from './../../assets/3dbackground.png';
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AppStrings from "../../utils/appStrings";
export const Header = () => {
    const { t } = useTranslation();
    return (
        <Container className="header">
            <div className="header-image">
                <img src={background} alt="" style={{ width: '100%' }} loading="lazy" />
            </div>
            <div className="header-content">
                <h3 className="mainTitle">
                    {t(AppStrings.platform_of)}
                    <span >{t(AppStrings.Al_Ghaly)}</span>
                </h3>

                <div className="subTitle" style={{ color: '#757F9A' }}>
                    <p>{t(AppStrings.master)} / <span>{t(AppStrings.teacher_name)}</span></p>
                    <p>{t(AppStrings.platform_provider)}</p>
                </div>

                <div>
                    <div className="rainy-weather">
                        <div className="cloud-main">
                            {t(AppStrings.our_goal)}
                        </div>
                        <div className="cloud-center"></div>
                        <div className="cloud-left"></div>
                        <div className="droplet droplet1"></div>
                        <div className="droplet droplet2"></div>
                        <div className="droplet droplet3"></div>
                        <div className="droplet droplet4"></div>
                        <div className="droplet droplet5"></div>
                        <div className="droplet droplet6"></div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
