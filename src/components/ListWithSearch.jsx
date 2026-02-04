import "./ListWithSearch.css";
import { useEffect, useState } from "react";

function ListWithSearch({ list, onClickItem }) {
    const [searchValue, setSearchValue] = useState("");
    const [filteredList, setFilteredList] = useState(list || []);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        if (searchValue !== "") {
            setFilteredList(
                list.filter(item => item.toLowerCase().includes(searchValue.toLowerCase()))
            );
        } else {
            setFilteredList(list);
        }
    }, [searchValue, list]);

    return (
        <div className="listWithSearch">
            <input type="text" className="searchInput" value={searchValue} onChange={handleSearchChange} />
            <ul className="itemList">
                {filteredList.map((item, index) => (
                    <li key={index} className="listItem" onClick={() => onClickItem && onClickItem(item)}>
                        {typeof item === "string" ? item : item.textoListado || ""}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListWithSearch