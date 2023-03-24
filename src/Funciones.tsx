import React from "react";
import { PropsFunciones } from "./PropsFunciones";

export default function Funciones() {
  const [nombre, setNombre] = React.useState<string>("Cristian");
  const [apellido, setApellido] = React.useState<string>("Ledezma");
  const handleChangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)
  const handleChangeApellido = (e: React.ChangeEvent<HTMLInputElement>) => setApellido(e.target.value)
  React.useEffect(() => {
    setTimeout(() => {
      setNombre('Mario');
      setApellido('Bros');
    }, 3000)
  });
  
  return (
    <div className="mt-5">
      <label className="form-label">Hola, mi nombre es {nombre} {apellido}</label>
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          value={nombre}
          onChange={handleChangeNombre}>
        </input>
        <input
          className="form-control"
          type="text"
          value={apellido}
          onChange={handleChangeApellido}>
        </input>
      </div>
      <PropsFunciones nombre={nombre} apellido={apellido} edad={45} />
    </div>
  )
}