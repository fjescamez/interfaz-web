import { create_session } from './auth'; 

const getSessionData = () => {
    try {
        return JSON.parse(localStorage.getItem('session_cf'));
    } catch {
        return null;
    }
};

const isSessionValid = (sessionData) => {
    if (!sessionData?.expiry_time) return false;
    return new Date(sessionData.expiry_time) > new Date();
};

export const postDataCloud = async (data) => {
    const url = import.meta.env.VITE_API_URL_CLOUDFLOW;

    let sessionData = getSessionData();

    // ❌ no hay sesión o está caducada
    if (!sessionData || !isSessionValid(sessionData)) {

        localStorage.removeItem('session_cf');

        const auth = await create_session();

        sessionData = {
            session: auth.session,
            expiry_time: auth.expiry_time
        };

        localStorage.setItem('session_cf', JSON.stringify(sessionData));
    }

    const dataPost = {
        ...data,
        session: sessionData.session
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataPost)
        });

        const result = await response.json();

        // 🔁 si la API invalida la sesión igualmente, reintenta UNA vez
        if (
            result?.error === 'invalid_session' ||
            result?.code === 'invalid_session'
        ) {
            localStorage.removeItem('session_cf');

            const auth = await create_session();

            sessionData = {
                session: auth.session,
                expiry_time: auth.expiry_time
            };

            localStorage.setItem('session_cf', JSON.stringify(sessionData));

            return postDataCloud(data); // retry único
        }

        return result;

    } catch (error) {
        console.error(error);

        notify('error', 'Error', 'Ha ocurrido un error al enviar los datos');

        return { status: 'error' };
    }
};