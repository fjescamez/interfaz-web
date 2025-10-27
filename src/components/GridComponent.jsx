function GridComponent({ title, grid, gridClick, hideKeys = [] }) {
    return (
        <>
            <h1 className="gridTitle">{title || ""}</h1>
            <div className="gridContainer">
                {grid
                    .filter((item) => !hideKeys.includes(item.key)) // Filtrar los items que no se deben mostrar
                    .map((item) => (
                        <div className="gridItem" key={item.key} onClick={() => gridClick(item.key, item.title)}>
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
    );
}

export default GridComponent;