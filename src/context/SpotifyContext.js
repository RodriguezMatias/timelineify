import React, {useEffect, useRef, useState} from 'react';
import {v4} from 'uuid';
import axios from 'axios';
import {useHistory} from 'react-router';

const StompClientContext = React.createContext(null);

export default StompClientContext;

export function SpotifyContextProvider({ children }) {
    const clientId = "7db92e56e9244449b3eebc16f40ad031";
    const redirectUri = `${window.location.protocol}//${window.location.host}/auth`;
    const scope = "playlist-modify-public";
    const authRequestUuid = null;
    const history = useHistory();

    const connection = useRef(null);
    const [accessToken, setAccessToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loginFailed, setLoginFailed] = useState(false);

    const startLogin = () => {
        console.log('Starting spotify login...');
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scopes=${scope}`
    }

    const finishLogin = async () => {
        console.log('Finishing spotify login...');
        // Grab the access token from the URL
        const urlParams = new URL(window.location.href.replace(/#/g,"?"));
        const newAccessToken = urlParams.searchParams.get("access_token");

        if (!newAccessToken) {
            setLoginFailed(true);
            history.push('/');
            return;
        }
        setAccessToken(newAccessToken);

        const headers = {};
        headers.Authorization = `Bearer ${newAccessToken}`;
        connection.current = axios.create({
            baseURL: 'https://api.spotify.com',
            timeout: 10000,
            crossDomain: true,
            headers
        });

        try {
            const userDataResponse = await connection.current.get('/v1/me');
            setLoginFailed(false);
            setUserData(userDataResponse.data);
            history.push('/');
        } catch (e) {
            setLoginFailed(true);
            history.push('/');
        }
    }

    const logout = async () => {
        console.log('Logging out from spotify...');
        connection.current = null;
        setUserData(null);
        setAccessToken(null);
    }

    const search = async (searchTerm) => {
        try {
            const searchResponse = await connection.current.get(`/v1/search?q=${searchTerm}&type=artist`);
            return searchResponse.data;
        } catch (e) {
            return null;
        }
    }

    const loggedIn = userData !== null;

    return (
        <StompClientContext.Provider value={{
            startLogin,
            finishLogin,
            userData,
            loginFailed,
            setLoginFailed,
            loggedIn,
            logout,
            search
        }}>
            { children }
        </StompClientContext.Provider>
    );
}
