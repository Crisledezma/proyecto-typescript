import { useState, useEffect } from 'react'
import axios from 'axios'
import { ListaPublicaciones } from '../molecules/ListaPublicaciones'
import { IPost } from '../../models/IPost'
import { IUser } from '../../models/IUser'
import { IComment } from '../../models/IComment'
import { IAlbum } from '../../models/IAlbum'
import { IPhoto } from '../../models/IPhoto'

export const ListaPublicacionesWrapper = () => {
  const [publicaciones, setPublicaciones] = useState<IPost[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  const traerPublicaciones = async () => {
    try {
      const [posts, comments, users, albums, photos] = await Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/posts"),
        axios.get("https://jsonplaceholder.typicode.com/comments"),
        axios.get("https://jsonplaceholder.typicode.com/users"),
        axios.get("https://jsonplaceholder.typicode.com/albums"),
        axios.get("https://jsonplaceholder.typicode.com/photos")
      ]);
      const publicacionesCompletas = (posts.data as IPost[]).map(
        (publicacion) => {
          const autor = (users.data as IUser[]).find(
            (user) => user.id === publicacion.userId
          );

          const album = (albums.data as IAlbum[]).find(
            (album) => album.userId === publicacion.userId
          );

          const foto = (photos.data as IPhoto[]).find(
            (photo) => photo.albumId === album?.id
          );

          const comentarios = (comments.data as IComment[]).filter(
            (comentario) => comentario.postId === publicacion.id
          );

          return {
            ...publicacion,
            autor,
            comentarios,
            album,
            foto
          }
        }
      );
      setPublicaciones(publicacionesCompletas);
      setCargando(false);
    } catch (error) {
      console.error(error);
    }
  }

  // ComponentDidMount
  useEffect(() => {
    traerPublicaciones();
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (<ListaPublicaciones publicaciones={publicaciones} />);
}