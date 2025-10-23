function GridComponent({ title, grid, gridClick }) {
    return (
        <>
            <h1 className="gridTitle">{title || ""}</h1>
            <div className="gridContainer">
                {grid.map((item) => (
                    <div className="gridItem" key={item.key} onClick={() => gridClick(item.key)}>
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