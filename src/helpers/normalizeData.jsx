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