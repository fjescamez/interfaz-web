import { use, useEffect, useState } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import { useSession } from '../context/SessionContext';
import { postData } from '../helpers/fetchData';
import JacketComponent from '../components/JacketComponent';
import "./KioscoPage.css";
import WorkableComponent from '../components/WorkableComponent';
import useSocket from '../helpers/useSocket';
import { HiOutlineRefresh } from "react-icons/hi";
import { BlinkBlur } from "react-loading-indicators";
import { useTabs } from '../context/TabsContext';

function KioscoPage() {
    const { session } = useSession();
    const [userJackets, setUserJackets] = useState([]);
    const [selectedJacket, setSelectedJacket] = useState(null);
    const socket = useSocket();
    const { closeTab } = useTabs();

    const listJackets = async () => {
        const result = await postData("orderKiosks/testJackets", { username: session.username });
        setUserJackets(result.jackets);
    }

    useEffect(() => {
        setSelectedJacket(userJackets.find(jacket => jacket._id === selectedJacket?._id) || userJackets[0])
    }, [userJackets]);

    useEffect(() => {
        listJackets();
    }, [])

    useEffect(() => {
        if (!socket) return;

        socket.on("updateKiosk", ({ username, tabKey }) => {
            if (username === session?.username) {
                listJackets();

                if (tabKey) {
                    closeTab(tabKey, false); // Cerrar la pestaña sin redirigir
                }
            }
        });

        return () => {
            socket.off("updateKiosk");
        };
    }, [socket]);

    return (
        <div className="detailsContainer">
            <DetailsHeader
                title="KIOSCO GENERAL"
                subtitle={<HiOutlineRefresh onClick={() => { setUserJackets([]); listJackets(); }} style={{ border: "none" }} />}
                insteadOfActions={<></>}
            />
            {userJackets.length > 0 ? (
                <div className="detailsScroll">
                    <div className="kioskContainer">
                        <div className="jacketList">
                            {userJackets.map(jacket => (
                                <JacketComponent key={jacket._id} jacket={jacket} selectedJacket={selectedJacket} setSelectedJacket={setSelectedJacket} />
                            ))}
                        </div>
                        <div className="workableList">
                            {selectedJacket && selectedJacket.log.map(workable => (
                                <WorkableComponent
                                    key={workable.workable}
                                    workable={workable}
                                    id_pedido={selectedJacket?.variables?.id_pedido || null}
                                    trappingData={selectedJacket?.variables?.trapping || null}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="executingContainer">
                    <BlinkBlur variant="dotted" color="var(--highlight)" size="large" speedPlus="0" />
                    <h1>Cargando</h1>
                </div>
            )}
        </div>
    )
}

export default KioscoPage