function getValueByPath(obj, path) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function normalizeData(data, columns) {
  return data.map(item => {
    const newItem = { ...item };
    columns.forEach(col => {
      if (col.key.includes(".")) {
        newItem[col.key] = getValueByPath(item, col.key);
      }
    });
    return newItem;
  });
}

export function sanitizeData(data) {
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  } else if (data && typeof data === "object" && Object.keys(data).length === 0) {
    return ""; // Convert empty objects to empty strings
  } else if (data && typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, sanitizeData(value)])
    );
  }
  return data; // Return the value as is for non-object types
};