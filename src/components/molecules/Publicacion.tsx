import { IAlbum } from "../../models/IAlbum";
import { IPost } from "../../models/IPost"
import { Comentario } from '../atoms/Comentario';
import { Album } from "./Album";

interface IPublicacionProps {
  post: IPost;
}

export const Publicacion: React.FC<IPublicacionProps> = ({ post }) => {
  
  const renderComentarios = () => {
    if (!post.comentarios || !post.comentarios.length) return null;

    return (
      <div className='row'>
        {post.comentarios.map((comentario) => {
          return  <Comentario key={`${comentario.id}-${comentario.email}`} comentario={comentario} />
        })}
      </div>
    )
  }

  return (
      <li key={post.id} className="list-group-item">
        <p className="text-danger">Publicación #{post.id}</p>
        <p>Escrito por: {post.autor?.name}</p>
        <h2 className="text-primary">Título: {post.title}</h2>
        <p>{post.body}</p>
        <h3>Comentarios:</h3>
        {renderComentarios()}
        {(post?.album && post?.foto) && <Album album={post.album} foto={post.foto} />}
      </li>
  )
}