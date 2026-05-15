import { resolveIcon } from "../shared/icons/resolveIcon";

function GridComponent({ title, grid, gridClick, hideKeys = [] }) {

    return (
        <>
            <h1 className="gridTitle">{title || ""}</h1>

            <div className="gridContainer">
                {grid
                    .filter((item) => !hideKeys.includes(item.key))
                    .map((item) => {

                        const Icon = resolveIcon(item.icon);

                        return (
                            <div
                                className="gridItem"
                                key={item.key}
                                onClick={() => gridClick(item.key, item.title)}
                            >
                                <div className="icon">
                                    {Icon && <Icon />}
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
                        );
                    })}
            </div>
        </>
    );
}

export default GridComponent;