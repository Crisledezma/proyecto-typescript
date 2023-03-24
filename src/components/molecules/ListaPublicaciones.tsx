import { IPost } from '../../models/IPost';
import { Publicacion } from './Publicacion';

export interface IListaPublicacionesProps {
  publicaciones: IPost[];
}

export const ListaPublicaciones: React.FC<IListaPublicacionesProps> = ({ publicaciones } ) => {
  return (
    <ul className='list-group'>
      {publicaciones.map((publicacion) => (
        <Publicacion key={publicacion.id} post={publicacion} />
      ))};
    </ul>
  )
}