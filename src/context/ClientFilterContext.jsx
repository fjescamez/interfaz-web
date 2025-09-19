import { createContext, useContext, useState } from "react";

const ClienteFilterContext = createContext();

export const ClienteFilterProvider = ({ children }) => {
  const [clienteCodigos, setClienteCodigos] = useState({});
  const [clienteDatos, setClienteDatos] = useState({});

  return (
    <ClienteFilterContext.Provider value={{ clienteCodigos, setClienteCodigos, clienteDatos, setClienteDatos }}>
      {children}
    </ClienteFilterContext.Provider>
  );
};

export const useClienteFilter = () => useContext(ClienteFilterContext);