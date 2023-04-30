interface Props {
  src: string;
  type: number;
  alt: string;
  onFeedImageClick: React.MouseEventHandler<HTMLDivElement>;
}

interface imageSizeType {
  [key: number]: string;
}

const FeedImage = ({ src, type, alt, onFeedImageClick }: Props) => {
  const imageSize: imageSizeType = {
    1: 'w-[100%] h-[100%]',
    2: 'w-[50%] h-[50%]',
    3: 'w-[33%] h-[33%]',
  };

  return (
    <div onClick={onFeedImageClick}>
      <img className={imageSize[type]} src={src} alt={alt} />
    </div>
  );
};

export default FeedImage;
