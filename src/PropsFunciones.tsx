import PropTypes from "prop-types";
import React from 'react';

interface IPropsFunciones {
  nombre  : string;
  apellido: string;
  edad    : number;
}

export const PropsFunciones: React.FC<IPropsFunciones> = ({apellido, nombre, edad}) => {
  return (
    <>
      <p>{nombre} {apellido}, { edad } años</p>
    </>
  )
}

export default PropsFunciones;