import { useState } from "react";
import "./InputWithSearch.css";
import { fetchData } from "../../helpers/fetchData";

function InputWithSearch({ clickBehavior, placeholder }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPedidos = async (term) => {
        setSearchTerm(term);
        setLoading(true);
        const results = await fetchData('orders', term);
        setLoading(false);
        setSearchResults(results);
    };

    return (
        <div className={`inputWithSearch`}>
            <input
                type="text"
                name="id_pedido"
                id="id_pedido"
                value={searchTerm}
                onChange={e => fetchPedidos(e.target.value)}
                placeholder={placeholder || "Introduzca su búsqueda..."}
            />
            {searchTerm && (
                <div className="searchResults">
                    <ul>
                        {loading ? (
                            <li>Cargando...</li>
                        ) : (searchResults.length > 0 ? (
                            searchResults.map((pedido) => (
                                <li key={pedido._id} onClick={() => clickBehavior(pedido)}>
                                    {pedido.id_pedido}
                                </li>
                            ))
                        ) : (
                            <li>No se encontraron resultados</li>
                        )
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default InputWithSearch;