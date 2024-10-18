import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode'; // Fixed import
import { useRefreshMutation } from '../features/slices/authSlice';
import { useCookies } from 'react-cookie';
import Loader from '../components/common/Loader';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [refresh] = useRefreshMutation();
    const refreshTimeoutRef = useRef(null); // Ref to store timeout ID
    const refreshInProgress = useRef(false); // Prevent multiple refresh attempts

    // Function to decode token and check expiration
    const getDecodedToken = useCallback((token) => {
        try {
            return jwtDecode(token);
        } catch {
            return null;
        }
    }, []);

    // Function to get access token from cookies
    const getAccessToken = useCallback(() => cookies.accessToken, [cookies.accessToken]);

    // Function to refresh the token
    const refreshToken = useCallback(async () => {
        if (refreshInProgress.current) return; // Avoid duplicate refresh calls

        refreshInProgress.current = true;
        try {
            const { data } = await refresh().unwrap();
            if (data?.accessToken) {
                setCookie('accessToken', data.accessToken, { path: '/', secure: true, sameSite: 'strict' });
                setIsAuthenticated(true);
                scheduleTokenRefresh(data.accessToken); // Schedule next refresh
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            refreshInProgress.current = false;
        }
    }, [refresh, setCookie]);

    // Function to schedule the token refresh just before it expires
    const scheduleTokenRefresh = useCallback((token) => {
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current); // Clear previous timeout
        }

        const decodedToken = getDecodedToken(token);
        if (decodedToken) {
            const expirationTime = decodedToken.exp * 1000;
            const currentTime = Date.now();
            const timeUntilExpiration = expirationTime - currentTime;

            const refreshTime = timeUntilExpiration - 60000;

            refreshTimeoutRef.current = setTimeout(refreshToken, refreshTime);
        }
    }, [getDecodedToken, refreshToken]);

    // Function to check authentication and schedule the token refresh
    const checkAuth = useCallback(() => {
        const token = getAccessToken();
        if (!token) {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }

        const decodedToken = getDecodedToken(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken?.exp < currentTime) {
            refreshToken(); // Token expired, refresh immediately
        } else {
            setIsAuthenticated(true);
            scheduleTokenRefresh(token); // Schedule the token refresh
        }

        setIsLoading(false);
    }, [getAccessToken, getDecodedToken, refreshToken, scheduleTokenRefresh]);

    useEffect(() => {
        checkAuth();

        // Clean up the timeout when the component unmounts
        return () => {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }
        };
    }, [checkAuth]);

    // Functions for login and logout
    const loginLocal = useCallback((token) => {
        setCookie('accessToken', token.accessToken, { path: '/', secure: true, sameSite: 'strict' });
        setCookie('refreshToken', token.refreshToken, { path: '/', secure: true, sameSite: 'strict' });
        setIsAuthenticated(true);
        scheduleTokenRefresh(token.accessToken); // Schedule token refresh on login
    }, [setCookie, scheduleTokenRefresh]);

    const logoutLocal = useCallback(() => {
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
        }
        removeCookie('accessToken');
        removeCookie('refreshToken');
        setIsAuthenticated(false);
    }, [removeCookie]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginLocal, logoutLocal, getAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
