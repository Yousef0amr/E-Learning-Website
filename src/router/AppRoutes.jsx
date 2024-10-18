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
import Subscribe from '../screens/Subscribe.jsx';
import MyCourses from '../screens/MyCourses.jsx';
import Profile from '../screens/Profile.jsx';
import Wallet from '../screens/Wallet.jsx';
import UserProfile from '../components/profile/UserProfile.jsx';
import Invoices from '../screens/Invoices.jsx';

import CloseAccount from '../screens/CloseAccount.jsx';
import { Navigate } from 'react-router-dom';
import ChangePassword from '../screens/ChangePassword.jsx';
import ForgetPassword from '../screens/ForgetPassword.jsx';
import RestPassword from '../screens/RestPassword.jsx';

const AppRoutes = () => {
    const location = useLocation()

    return (
        <Routes location={location} key={location.pathname}>
            <Route index path="/" element={
                <Animate >
                    <Home />
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
                <Route path="/profile" element={
                    <Profile />
                } >
                    <Route index element={<Navigate to="my-account" />} />

                    <Route path='my-account' element={
                        <Animate >
                            <UserProfile />
                        </Animate>
                    } />

                    <Route path='my-wallet' element={
                        <Animate >
                            <Wallet />
                        </Animate>
                    } />

                    <Route path='my-invoices' element={
                        <Animate >
                            <Invoices />
                        </Animate>
                    } />

                    <Route path='change-password' element={
                        <Animate >
                            <ChangePassword />
                        </Animate>
                    } />
                    <Route path='close-account' element={
                        <Animate >
                            <CloseAccount />
                        </Animate>
                    } />
                </Route>

                <Route path="/course/:courseId/learn/:enrollmentId"  >
                    <Route index element={
                        <Animate >
                            <Learn />
                        </Animate>
                    } />


                </Route>
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
                <Route path="/reset-password-email" element={
                    <Animate >
                        <ForgetPassword />

                    </Animate>
                } />
                <Route path="/reset-password" element={
                    <Animate >
                        <RestPassword />

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
