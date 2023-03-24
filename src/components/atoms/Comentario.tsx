import React from 'react';
import { IComment } from '../../models/IComment';

interface IComentario {
  comentario: IComment;
}

export const Comentario: React.FC<IComentario> = ({comentario}) => {
  return (
    <div className='card col-6'>
      <p># {comentario.id}</p>
      <p><span className='fw-bold'>Título:</span> {comentario.name}</p>
      <p><span className='fw-bold'>Comentario:</span> {comentario.body}</p>
    </div>
  )
}