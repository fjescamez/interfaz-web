import MontajeSvg from '../../assets/svg/MontajeSvg';
import GeneralPopUp from '../GeneralPopUp';
import { useEffect, useState } from 'react';
import SubmitButton from '../buttons/SubmitButton';
import FormGroup from '../formComponents/FormGroup';
import './MultiRipMontaje.css';
import { fetchData } from '../../helpers/fetchData';
import { BlinkBlur } from "react-loading-indicators";
import RipPopUp from '../pedidoComponents/RipPopUp';

function MultiRipMontaje({ setModal, listMontajes, fullOrder }) {
    const [indexMontaje, setIndexMontaje] = useState(0);
    const [colorsMontajes, setColorsMontajes] = useState([]);

    const moveLeft = () => {
        if (indexMontaje > 0) {
            setIndexMontaje(indexMontaje - 1);
        }
    };

    const moveRight = () => {
        if (indexMontaje < listMontajes.length - 1) {
            setIndexMontaje(indexMontaje + 1);
        }
    };

    useEffect(() => {
        const fetchColores = async () => {
            const colores = await Promise.all(listMontajes.map(async (montaje) => {
                const colores = await fetchData("montajes/rip", montaje.archivo);
                return {
                    name: montaje.id_archivo,
                    colors: colores
                };
            }));
            setColorsMontajes(colores);
        };

        fetchColores();
    }, [listMontajes]);

    return (
        <>
            <div className="overlay"></div>
            <div className="multiRipMontaje">
                {colorsMontajes.length > 0 ? (
                    <RipPopUp
                        idMontaje={listMontajes[indexMontaje]._id}
                        fullOrder={fullOrder}
                        multiRip={true}
                        setRipModal={setModal}
                    />
                ) : (
                    <div className="executingContainer">
                        <BlinkBlur variant="dotted" color="var(--highlight)" size="large" speedPlus="0" />
                    </div>
                )}
                {listMontajes.length > 1 && (
                    <div className="carruselMultiRip">
                        <div className="leftButton">
                            <SubmitButton text="&#9664;" onClick={() => moveLeft()} />
                        </div>
                        <div className="indexes">
                            {listMontajes.map((_, index) => (
                                <div
                                    key={index}
                                    className={`index ${index === indexMontaje ? 'active' : ''}`}
                                    onClick={() => setIndexMontaje(index)}
                                />
                            ))}
                        </div>
                        <div className="rightButton">
                            <SubmitButton text="&#9658;" onClick={() => moveRight()} />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default MultiRipMontaje