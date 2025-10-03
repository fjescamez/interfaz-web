export const getUserPreferences = async (session, tableInfo, setTableInfo) => {

    const { preferences } = session;
    const { endPoint } = tableInfo;

    if (preferences && preferences.tables && preferences.tables[endPoint]) {

        const customPreferences = preferences.tables[endPoint].columns;
        const updated = {
            ...tableInfo,
            tableColumns: tableInfo.tableColumns.map(col => ({
                ...col,
                active: customPreferences.includes(col.key)
            }))
        };
        setTableInfo(updated);
    }
};