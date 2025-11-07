import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function useSocket() {
    const puertoApi = 3300;
    const SOCKET_URL = `http://192.4.26.112:${puertoApi}`; // Cambia por tu servidor

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