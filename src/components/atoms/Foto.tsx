interface IFotoProps {
  thumbnailUrl: string;
}

export const Foto = ({ thumbnailUrl }: IFotoProps) => {
  return (
    <img className="img-thumbnail rounded" src={thumbnailUrl} />
  );
};