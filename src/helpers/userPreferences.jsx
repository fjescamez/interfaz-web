export const getUserPreferences = async (session, tableInfo, setTableInfo, setColumns) => {

    const { preferences } = session;
    const { endPoint } = tableInfo;

    if (preferences && preferences.tables && preferences.tables[endPoint]) {
        const columns = preferences.tables[endPoint].columns;
        const columnsOrder = preferences.tables[endPoint].columnsOrder;

        if (columnsOrder?.length > 0) {
            setColumns(columnsOrder);
        }

        if (columns && columns.length > 0) {
            const updated = {
                ...tableInfo,
                tableColumns: tableInfo.tableColumns.map(col => ({
                    ...col,
                    active: columns.includes(col.key)
                }))
            };
            setTableInfo(updated);
        }
    }
};