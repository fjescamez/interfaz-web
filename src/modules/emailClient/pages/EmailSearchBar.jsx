function EmailSearchBar({
    onSearch,
    onClear,
    loading
}) {
    const [value, setValue] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        onSearch(value.trim());
    };

    const handleClear = () => {
        setValue("");
        onClear();
    };

    return (
        <form
            className="emailSearchBar"
            onSubmit={handleSubmit}
        >
            <div className="emailSearchInputContainer">
                <MdSearch className="emailSearchIcon" />

                <input
                    type="search"
                    value={value}
                    onChange={event =>
                        setValue(event.target.value)
                    }
                    placeholder="Buscar"
                    aria-label="Buscar correos"
                />

                {value && (
                    <button
                        type="button"
                        className="emailSearchClear"
                        onClick={handleClear}
                        aria-label="Limpiar búsqueda"
                        title="Limpiar búsqueda"
                    >
                        ×
                    </button>
                )}
            </div>
        </form>
    );
}