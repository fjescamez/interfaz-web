import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function useSocket() {
    const urlApi = import.meta.env.VITE_API_URL;
    const SOCKET_URL = `${urlApi}`; // Cambia por tu servidor

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