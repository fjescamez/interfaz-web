import { useLocation, useNavigate } from "react-router-dom";
import { useClienteFilter } from "../context/ClientFilterContext";
import { useTabs } from "../context/TabsContext";

function GridComponent({ grid, object, title }) {
    const { closeTab, tabs, setTabs } = useTabs();
    const { setClienteCodigos, setClienteDatos } = useClienteFilter();
    const location = useLocation();
    const navigate = useNavigate();

    const gridItemClick = (key) => {
        alert(key)
    };

    const clientClick = (key) => {
        const patname = location.pathname === '/home' ? '' : location.pathname;
        const path = `${patname}/${key}`;
        //const path = `${location.pathname}/${key}`;

        const tabTitle = `${object?.name} | ${key.toUpperCase()}`;

        if (!tabs.some(tab => tab.path === path)) {
            if (object.company) {
                setClienteCodigos(prev => ({ ...prev, [path]: object.code }));
                setClienteDatos(prev => ({ ...prev, [path]: object }));
            }

            setTabs(prev => {
                if (prev.some(tab => tab.path === path)) return prev;
                return [...prev, { path, title: tabTitle }];
            });
        }
        navigate(path);
    };

    return (
        <>
            <h1 className="gridTitle">{title}</h1>
            <div className="gridContainer">
                {grid.map((item) => (
                    <div className="gridItem" key={item.key} onClick={() => clientClick(item.key)}>
                        <div className="icon">
                            {item.icon}
                        </div>
                        <div className="text">
                            <div className="title">
                                {item.title}
                            </div>
                            <div className="body">
                                {item.body}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}

export default GridComponent