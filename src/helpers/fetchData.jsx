import { notify } from "./notify";

/* FETCH GENÉRICOS */
export const fetchData = async (endPoint, searchValue, page = "1", setData, setTotal, clientFilter = "", userFilter = "") => {
    const urlApi = import.meta.env.VITE_API_URL;

    let url = `${urlApi}/${endPoint}/get/${page}`;

    const session = JSON.parse(localStorage.getItem('session'));

    const params = [];
    if (searchValue) params.push(`search=${encodeURIComponent(searchValue)}`);
    if (clientFilter) params.push(`cliente_codigo=${encodeURIComponent(clientFilter)}`);
    if (userFilter) params.push(`usuario_asignado=${encodeURIComponent(userFilter)}`);

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
                notify('error', 'Error', errorData.error || 'Error desconocido');
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
            notify('error', 'Error', 'Ha ocurrido un error al cargar los datos');
        }
    }
};

export const fetchDataNoLimits = async (endPoint) => {
    const urlApi = import.meta.env.VITE_API_URL;

    let url = `${urlApi}/${endPoint}/getAll`;

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
        notify('error', 'Error', 'Ha ocurrido un error al cargar los datos');
    }
}

export const fetchOneItem = async (endPoint, id) => {
    const urlApi = import.meta.env.VITE_API_URL;

    let url = `${urlApi}/${endPoint}/${id}`;

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
        notify('error', 'Error', error);
    }
};

export const postData = async (endPoint, data = {}) => {
    const urlApi = import.meta.env.VITE_API_URL;

    let url = `${urlApi}/${endPoint}`;

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
        notify('error', 'Error', 'Ha ocurrido un error al enviar los datos');
        return { status: "error" };
    }
};

export const updateData = async (endPoint, data, id) => {
    const urlApi = import.meta.env.VITE_API_URL;

    let url = `${urlApi}/${endPoint}/${id}`;
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
        notify('error', 'Error', error);
    }
};

/* BORRAR VARIOS ELEMENTOS */
export const deleteMultipleObjects = async (endPoint, data, setData) => {
    const urlApi = import.meta.env.VITE_API_URL;
    let url = `${urlApi}/${endPoint}/remove`;

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
        notify('error', 'Error', 'Ha ocurrido un error al eliminar los datos');
    }
};