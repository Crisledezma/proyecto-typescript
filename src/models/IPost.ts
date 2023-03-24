import { IAlbum } from "./IAlbum";
import { IComment } from "./IComment";
import { IUser } from "./IUser";
import { IPhoto } from './IPhoto';

export interface IPost {
  userId      : number;
  id          : number;
  title       : string;
  body        : string;
  autor?      : IUser;
  comentarios?: IComment[];
  album?      : IAlbum;
  foto?       : IPhoto;
}