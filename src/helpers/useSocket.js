import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://192.4.26.112:3300'; // Cambia por tu servidor

export default function useSocket() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const s = io(SOCKET_URL);
        setSocket(s);

        return () => {
            s.disconnect(); // limpiar al desmontar
        };
    }, []);

    return socket;
}