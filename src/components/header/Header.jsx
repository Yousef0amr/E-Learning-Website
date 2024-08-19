import React from "react";
import './../../styles/header.css'
import background from './../../assets/3dbackground.png'
import { Container } from "react-bootstrap";

export const Header = () => {
    return (
        <Container className="header">
            <div className="header-image">
                <img src={background} alt="" style={{ width: '100%' }} />
            </div>
            <div className="header-content">
                <h3 className="mainTitle">
                    منصة
                    <span >الغالي</span>
                </h3>

                <div className="subTitle">
                    <p>أ / <span>علي زينهم</span></p>
                    <p>منصة تهيئة الغالي في مادة الفيزياء</p>
                </div>

                <div>
                    <div className="rainy-weather">
                        <div className="cloud-main">
                            نبتغي قمم الجبال
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
}
