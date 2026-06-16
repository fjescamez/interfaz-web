import { postDataCloud } from "./postData";

export const get_overview_with_options = async (activeFilters, loadJacketIds = [], previousTimestamp) => {
    const { hold_in_kiosk, running, state, done } = activeFilters;
    const raw = localStorage.getItem('session');
    const infoUser = JSON.parse(raw);

    const initialQuery = [
        "(",
        "modification", "greater than or equal to",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        ")",
        "and",
        "(",
        "system", "not equal to", true,
        ")",
        "and",
        "(",
        "roles.handler", "equal to", infoUser.username,
        ")"
        
    ];

    const filtersList = [];

    if (hold_in_kiosk) {
        filtersList.push([
            "hold_in_kiosk", "equal to", true
        ]);
    }

    if (done) {
        filtersList.push([
            "done", "equal to", true
        ]);
    }

    if (running) {
        filtersList.push([
            "done", "does not exist"
        ]);
    }

    if (state === "error") {
        filtersList.push([
            "state", "equal to", "error"
        ]);
    }

    const queryFilters = [];

    if (filtersList.length > 0) {
        queryFilters.push("and", "(");

        filtersList.forEach((filter, index) => {
            if (index > 0) {
                queryFilters.push("or");
            }

            queryFilters.push(...filter);
        });

        queryFilters.push(")");
    }

    const query = [...initialQuery, ...queryFilters];

    const options = previousTimestamp ? {
        previous_timestamp: previousTimestamp,
        use_index: "Jacket_SortByModification",
        loaded_jacket_ids: loadJacketIds
    } : {}

    return postDataCloud({
        method: "hub.get_overview_with_options",
        query,
        options
    });
};

export const get_variables_from_workable = async (workable_id, variables) => {
    return postDataCloud({
        method: "hub.get_variables_from_workable",
        workable_id,
        variables,
    });
}

export const continue_workable_from_kiosk = async (workable_id, node_id, to_connector, variables) => {
    return postDataCloud({
        method: "hub.continue_workable_from_kiosk",
        workable_id,
        node_id,
        to_connector,
        variables
    });
}