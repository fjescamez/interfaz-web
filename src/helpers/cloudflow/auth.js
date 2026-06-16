export const create_session = async () => {
    const url = import.meta.env.VITE_API_URL_CLOUDFLOW;
    const infoUser = JSON.parse(localStorage.getItem('session'));

    if (!infoUser) return

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            method: "auth.create_session",
            user_name: infoUser.username,
            user_pass: "1234"
        })
    });

    return await response.json();
};