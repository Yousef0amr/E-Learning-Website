// src/socket.js
import { io } from 'socket.io-client';
import { BASEURL } from '../api/endpoints';


const socket = io(BASEURL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 2000,
    autoConnect: true,
});

export default socket;
