import { postDataCloud } from "./postData";

export const setQuery = (searchValue, searchFields = []) => {
    if (!searchValue?.trim()) return [];

    // Búsqueda avanzada: campo=valor&campo2=valor2
    if (searchValue.includes("=") || searchValue.includes("%3D")) {
        const decoded = decodeURIComponent(searchValue);

        return decoded
            .split("&")
            .flatMap((condition, index) => {
                const [field, value] = condition.split("=");

                if (!field || !value) return [];

                return [
                    ...(index > 0 ? ["and"] : []),
                    field,
                    "contains text like",
                    value
                ];
            });
    }

    // Búsqueda simple
    return searchFields.flatMap((field, index) => [
        ...(index > 0 ? ["or"] : []),
        field,
        "contains text like",
        searchValue
    ]);
};

export const create = async (collection, data) => {
    return postDataCloud({
        method: "custom_objects.create",
        collection,
        data
    })
}

export const delete_multiple = async (collection, ids) => {
    return postDataCloud({
        method: "custom_objects.delete_multiple",
        collection,
        ids
    })
}

export const get = async (collection, id) => {
    return postDataCloud({
        method: "custom_objects.get",
        collection,
        id
    })
}

export const list_with_options = async (collection, query=[], order_by = [], fields = [], page = 1, limit = 30) => {
    const skip = (page - 1) * limit;
    return postDataCloud({
        method: "custom_objects.list_with_options",
        collection,
        query,
        order_by,
        fields,
        options: {
            maximum: limit,
            first: skip,
            count: true
        }
    });
}

export const set_keys = async (collection, id, key_data) => {
    return postDataCloud({
        method: "custom_objects.set_keys",
        collection,
        id,
        key_data
    });
}
