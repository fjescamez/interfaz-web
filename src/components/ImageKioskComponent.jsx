import { useRef, useState } from "react";
import { notify } from "../helpers/notify";
import { toast } from "react-toastify";
import TabsCrossSvg from "../assets/svg/TabsCrossSvg";
import { useSession } from "../context/SessionContext";
import { IoMdCloseCircleOutline } from "react-icons/io";
import DeleteForm from "./formComponents/DeleteForm";
import { FaUserCircle } from "react-icons/fa";
import { SlBriefcase } from "react-icons/sl";
import { postData } from "../helpers/fetchData";

function ImageKioskComponent({ toggleKiosk, endpoint, id, client }) {
    const urlApi = import.meta.env.VITE_API_URL;
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const { session, setSession } = useSession();
    const [toggleDelete, setToggleDelete] = useState(false);
    const icon = endpoint === "users" ? <FaUserCircle /> : <SlBriefcase />;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const deleteFile = () => {
        setImage(null);
        inputRef.current.value = "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("avatar", image);

            let url = `${urlApi}/${endpoint}/avatar/${id}`;
            const session = JSON.parse(localStorage.getItem('session'));

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.token}`
                },
                body: formData
            });
            const result = await response.json();

            if (result.status === "success") {
                const notification = {
                    type: "success",
                    title: "Avatar actualizado",
                    body: endpoint === "users" ? "Su avatar de usuario ha sido actualizado correctamente" : "El logo de cliente ha sido actualizado correctamente."
                };

                notify(toast.success, notification.type, notification.title, notification.body);

                setImage(null);

                result.user && setSession(() => ({
                    ...session,
                    avatar: result.user.avatar
                }));
            }
        } catch (error) {
            const notification = {
                type: "error",
                title: "Error al actualizar el avatar",
                body: `No se ha podido actualizar el avatar. Error: ${error.message}`
            };
            notify(toast.error, notification.type, notification.title, notification.body);
            return;
        }

        toggleKiosk();
    };

    return (
        <>
            <div className="overlay"></div>
            <div className="formContainer">
                <div className="formHeaderBackground">
                    <div className="formHeader">
                        {icon}
                        <h1>EDITAR AVATAR</h1>
                        <button onClick={toggleKiosk}>
                            <IoMdCloseCircleOutline className="close" />
                        </button>
                    </div>
                </div>
                <div className="formBody">
                    <form onSubmit={handleSubmit}>
                        {((endpoint === "users" && session.avatar != "avatarDefault.jpg") || (endpoint === "clients" && client.avatar != "logoDefault.png")) && (
                            <label
                                htmlFor="deleteImage"
                                className="imageButton deleteImage"
                                onClick={() => setToggleDelete(true)}
                            >
                                Eliminar actual
                            </label>
                        )}
                        <label
                            htmlFor="image"
                            className="imageButton"
                        >
                            Seleciona una imagen</label>
                        <input
                            ref={inputRef}
                            type="file"
                            id="image"
                            name="file1"
                            accept="image/*"
                            className="fileInput"
                            onChange={handleFileChange}
                        />
                        {image && (
                            <div className="imageName">
                                {image.name}
                                <div className="crossIcon" onClick={deleteFile}><TabsCrossSvg /></div>
                            </div>
                        )}
                        {image && <button type="submit">Guardar</button>}
                    </form>
                    <div className="filler"></div>
                </div>
            </div>
            {toggleDelete &&
                <DeleteForm
                    setModal={setToggleDelete}
                    /* icon={icon}
                    title={"avatar"}
                    endpoint={endpoint} */
                    tableInfo={{
                        headerIcon: icon,
                        headerTitle: "AVATAR",
                        endPoint: endpoint
                    }}
                    id={id}
                    deleteAvatar={true}
                    toggleKiosk={toggleKiosk}
                />
            }
        </>
    )
}

export default ImageKioskComponent