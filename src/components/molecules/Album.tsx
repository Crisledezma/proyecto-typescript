import { IAlbum } from '../../models/IAlbum';
import { IPhoto } from '../../models/IPhoto';
import { Foto } from '../atoms/Foto';

interface IProps {
  album: IAlbum;
  foto: IPhoto;
}

export const Album = ({ album, foto }: IProps) => {
  return (
    <div className='custom-card m-3 text-center'>
      <Foto key={foto.id} thumbnailUrl={foto.thumbnailUrl} />
      <h2>Album: {album.title}</h2>
    </div>
  );
};