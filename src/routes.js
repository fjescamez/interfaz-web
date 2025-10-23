export const validRoutes = [
  "/test",
  "/home",
  "/home/:id",
  "/pedidos",
  "/pedidos/:id",
  "/pedidos/:id/kiosk",
  "/fichaTecnica/:id",
  "/len",
  "/clientes",
  "/clientes/:id",
  "/clientes/:id/pedidos",
  "/clientes/:id/contactos",
  "/clientes/:id/contactos/:id",
  "/clientes/:id/grupos",
  "/clientes/:id/grupos/:id",
  "/clientes/:id/estrategias",
  "/clientes/:id/estrategias/:id",
  "/clientes/:id/configuracion",
  "/estrategias",
  "/estrategias/:id",
  "/stock",
  "/produccion",
  "/usuarios",
  "/usuarios/:id",
  "/grupos",
  "/grupos/:id",
  "/contactos",
  "/contactos/:id",
  "/infoEmail/:id_pedido/:id"
];

export function isValidRoute(path) {
  return validRoutes.some(pattern => {
    if (pattern.includes(":")) {
      // Convierte el patrón en una expresión regular
      const regex = new RegExp("^" + pattern.replace(/:[^/]+/g, "[^/]+") + "$", "i");
      return regex.test(path);
    }
    return pattern === path;
  });
}