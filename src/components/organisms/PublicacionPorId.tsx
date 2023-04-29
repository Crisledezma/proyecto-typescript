import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import { IPost } from '../../models/IPost';
import { Publicacion } from '../molecules/Publicacion';

export const PublicacionPorId = () => {
  const { id } = useParams();
  const [publicacion, setPublicacion] = React.useState<IPost | undefined>(undefined);
  const [cargando, setCargando] = React.useState<boolean>(true);
  const traerPublicacion = React.useCallback(async () => {
    try {
      setCargando(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setPublicacion(response.data as IPost);
      setCargando(false);
    } catch (error) {
      console.log(error);
      setCargando(false);
    }
  }, [id]);
  React.useEffect(() => {
    traerPublicacion()
  }, [traerPublicacion]);
  cargando && <h2>Cargando...</h2>;
  return (
    <>{
      publicacion ?
      <Publicacion post={publicacion} /> :
      <h2>Esa publicación no existe...</h2>
    }</>
  )
}
