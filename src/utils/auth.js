import React, { createContext, useContext, useState, useLayoutEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRefreshMutation } from '../features/slices/authSlice';
import { useCookies } from 'react-cookie';
import Loader from '../components/common/Loader';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [refresh] = useRefreshMutation();



    const getAuthToken = () => {
        return cookies.accessToken;
    };

    const checkAuth = useCallback(async () => {
        setIsLoading(true);
        const token = getAuthToken();
        if (!token) {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                try {
                    const { data } = await refresh().unwrap();
                    if (data.accessToken) {
                        setCookie('accessToken', data.accessToken, { path: '/', secure: true, sameSite: 'strict' });
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Error refreshing access token:', error);
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, [refresh, cookies.accessToken, setCookie]);

    useLayoutEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const loginLocal = (token) => {
        setCookie('accessToken', token, { path: '/', secure: true, sameSite: 'strict' });
        setIsAuthenticated(true);
    };

    const logoutLocal = async () => {
        try {
            const token = getAuthToken();
            if (token) {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    const { data } = await refresh().unwrap();

                    if (data.accessToken) {
                        setCookie('accessToken', data.accessToken, { path: '/', secure: true, httpOnly: true, sameSite: 'strict' });
                    }
                }
            }
        } catch (error) {
            console.error('Error refreshing access token before logout:', error);
        } finally {
            removeCookie('accessToken');
            removeCookie('refreshToken');
            setIsAuthenticated(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginLocal, logoutLocal, getAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
