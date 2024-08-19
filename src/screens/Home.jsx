import React from "react";
import Levels from "../components/level/Levels.jsx";
import { Services } from "../components/service/Services.jsx";
import { Header } from "../components/header/Header.jsx";
import BookPoster from "../components/book/BookPoster.jsx";




const Home = () => {

    return (
        <>
            <Header />
            <BookPoster />
            <Services />
            <Levels />
        </>

    );
};

export default Home;
