import { toast } from 'react-toastify';
import { notify } from "./notify";

/* FETCH GENÉRICOS */
export const fetchData = async (endPoint, searchValue, page = "1", setData, setTotal, clientFilter = "") => {

    let url = `http://192.4.26.112:3000/${endPoint}/get/${page}`;

    const session = JSON.parse(localStorage.getItem('session'));

    const params = [];
    if (searchValue) params.push(`search=${encodeURIComponent(searchValue)}`);
    if (clientFilter) params.push(`cliente_codigo=${encodeURIComponent(clientFilter)}`);

    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.token}`
            }
        });

        // Reinicio de sesión cuando el token pierde validez
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401) {
                localStorage.removeItem('session');
                window.location.href = '/login';
            } else {
                notify(toast.error, 'error', 'Error', errorData.error || 'Error desconocido');
            }
            return [];
        }

        const data = await response.json();

        if (setData) {
            if (page != 1) {
                setData(prev => [...prev, ...data.results]);
            } else {
                setData(data.results);
            }
        }

        if (setTotal) {
            setTotal(data.total || data.count);
        }

        return data.results;
    } catch (error) {
        if (session) {
            notify(toast.error, 'error', 'Error', 'Ha ocurrido un error al cargar los datos');
        }
    }
};

export const fetchOneItem = async (endPoint, id) => {

    let url = `http://192.4.26.112:3000/${endPoint}/${id}`;

    const session = JSON.parse(localStorage.getItem('session'));

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.token}`
            }
        })
        const data = await response.json();

        return data;
    } catch (error) {
        notify(toast.error, 'error', 'Error', error);
    }
};

export const postData = async (endPoint, data) => {

    let url = `http://192.4.26.112:3000/${endPoint}`;
    const session = JSON.parse(localStorage.getItem('session'));

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        return result;
    } catch (error) {
        notify(toast.error, 'error', 'Error', 'Ha ocurrido un error al enviar los datos');
        return { status: "error" };
    }
};

export const updateData = async (endPoint, data, id) => {
    let url = `http://192.4.26.112:3000/${endPoint}/${id}`;
    const session = JSON.parse(localStorage.getItem('session'));

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        notify(toast.error, 'error', 'Error', error);
    }
};

/* export const deleteData = async (endPoint, id) => {
    let url = `http://192.4.26.112:3000/${endPoint}/${id}`;
    const session = JSON.parse(localStorage.getItem('session'));

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.token}`
            }
        });
        const result = await response.json();
        console.log(result);
        
        return result;
    } catch (error) {
        notify(toast.error, 'error', 'Error', 'Ha ocurrido un error al eliminar los datos');
    }
}; */

/* PREFERENCIAS DE USUARIO */
/*
export const fetchUserPreferences = async (username, table) => {
    const url = `http://192.4.26.112:3000/userPreferences/get?username=${encodeURIComponent(username)}&table=${encodeURIComponent(table)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (data.status === "success") {
            return data
        }
    } catch (error) {
        notify(toast.error, 'error', 'Error', error);
    }
}
*/

/* BORRAR VARIOS ELEMENTOS */
export const deleteMultipleObjects = async (endPoint, data, setData) => {
    let url = `http://192.4.26.112:3000/${endPoint}/remove`;
    const session = JSON.parse(localStorage.getItem('session'));

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (result.updatedData) {
            setData(result.updatedData);
        }
        return result;
    } catch (error) {
        notify(toast.error, 'error', 'Error', 'Ha ocurrido un error al eliminar los datos');
    }
};