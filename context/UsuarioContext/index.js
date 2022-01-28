import React, { useState, createContext, useContext } from "react";

const UsuarioContext = createContext();

export default function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState();
  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuarioContext() {
  const context = useContext(UsuarioContext);
  const { usuario, setUsuario } = context;
  return { usuario, setUsuario };
}