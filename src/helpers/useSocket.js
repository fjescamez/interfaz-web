import { io } from "socket.io-client";

let socket;

export default function useSocket() {
    const urlApi = import.meta.env.VITE_API_URL;

    if (!socket) {
        socket = io(urlApi, {
            transports: ["polling", "websocket"],
            reconnection: true,
        });
    }

    return socket;
}