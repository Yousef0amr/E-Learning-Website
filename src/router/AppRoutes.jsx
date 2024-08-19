import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Animate from '../components/common/Animate'
import { Learn } from './../screens/Learn.jsx';
import { SignUp } from './../screens/SignUp.jsx';
import { Login } from './../screens/Login.jsx';
import { ProtectedRoute, LoginRoute } from './../components/common/ProtectedRoute.jsx';
import NotFound from './../components/common/NotFound.jsx';
import { Course } from './../screens/Course.jsx';
import { CourseDetails } from './../screens/CourseDetails.jsx';
import Home from './../screens/Home.jsx';
import { Footer } from '../components/common/Footer.jsx';
import Subscribe from '../screens/Subscribe.jsx';
import MyCourses from '../screens/MyCourses.jsx';

const AppRoutes = () => {
    const location = useLocation()
    return (
        <Routes location={location} key={location.pathname}>
            <Route index path="/" element={
                <Animate >
                    <Home />  <Footer />
                </Animate>
            } />
            <Route element={<ProtectedRoute />}>
                <Route path="/years/:id" >
                    <Route index element={<Animate><Course /></Animate>} />
                    <Route path="course/:courseId" >
                        <Route index element={<Animate><CourseDetails /></Animate>} />
                        <Route path='subscribe/invoice' element={
                            <Animate >
                                <Subscribe />

                            </Animate>
                        } />

                    </Route>


                </Route>

                <Route path="/my-courses" element={
                    <Animate >
                        <MyCourses />
                    </Animate>
                } />
                <Route path="/course/:courseId/learn/:enrollmentId" element={
                    <Animate >
                        <Learn />
                    </Animate>
                } />
            </Route>
            <Route element={<LoginRoute />}>
                <Route path="/login" element={
                    <Animate >
                        <Login />

                    </Animate>
                } />
                <Route path="/sign-up" element={
                    <Animate >
                        <SignUp />

                    </Animate>
                } />
            </Route>
            <Route path="*" element={
                <Animate >
                    <NotFound />
                </Animate>
            } />
        </Routes>
    )
}

export default AppRoutes
