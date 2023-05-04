import ImageComponent from './ImageComponent';

interface Props {
  lazy: boolean;
  threshold?: number;
  src: string;
  shape: string;
  placeholder: string;
  alt: string;
  onAvatarClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Avatar = ({
  lazy,
  threshold,
  src,
  placeholder,
  shape,
  alt,
  onAvatarClick,
}: Props) => {
  return (
    <div
      className={`${avatarShape[shape]} relative inline-block border-1 border-solid border-stone-200 bg-white overflow-hidden w-[40px] h-[40px] flex justify-center items-center`}
      onClick={onAvatarClick}
    >
      <ImageComponent
        lazy={lazy}
        threshold={threshold}
        src={src}
        placeholder={placeholder}
        alt={alt}
        size='not-feed-small'
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
