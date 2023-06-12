import ImageComponent from './ImageComponent';

interface Props {
  lazy: boolean;
  threshold?: number;
  src: string;
  shape: string;
  placeholder: string;
  alt: string;
  width: string;
  height: string;
  onAvatarClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Avatar = ({
  lazy,
  threshold,
  src,
  placeholder,
  shape,
  alt,
  width,
  height,
  onAvatarClick,
}: Props) => {
  return (
    <div
      className={`${avatarShape[shape]} relative border-1 border-solid border-stone-200 bg-white overflow-hidden flex justify-center items-center`}
      onClick={onAvatarClick}
    >
      <ImageComponent
        lazy={lazy}
        threshold={threshold}
        src={src}
        placeholder={placeholder}
        alt={alt}
        imgStyle={`${width} ${height}`}
      />
    </div>
  );
};

export default Avatar;

interface avatarShapeType {
  [key: string]: string;
}

const avatarShape: avatarShapeType = {
  circle: 'rounded-[50%]',
  round: 'rounded',
  square: 'rounded-none',
};
