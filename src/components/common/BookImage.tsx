import { useEffect, useRef, useState } from 'react';

let observer: IntersectionObserver | null = null;
const LOAD_IMG_EVENT_TYPE = 'loadImage';

const onIntersection: IntersectionObserverCallback = (entries, io) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

interface Props {
  lazy: boolean;
  threshold: number;
  placeholder: string;
  src: string;
  feed?: string;
  alt: string;
  onImageClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface imageSizeType {
  [key: string]: string;
}

const BookImage = ({
  lazy,
  threshold,
  placeholder,
  src,
  feed,
  alt,
  onImageClick,
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return;
    }

    const handleLoadImage = () => setLoaded(true);

    const imgElement = imgRef.current;
    imgElement?.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);

    return () => {
      imgElement?.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    };
  }, [lazy]);

  // Intersection Observer를 통해 img 태그 관찰
  useEffect(() => {
    if (!lazy) return;

    if (!observer) {
      observer = new IntersectionObserver(onIntersection, { threshold });
    }
    imgRef.current && observer.observe(imgRef.current);
  }, [lazy, threshold]);

  const imageSize: imageSizeType = {
    'type-1': 'w-[100%] pb-[100%] overflow-hidden',
    'type-2': 'w-[50%] pb-[50%] overflow-hidden',
    'type-3': 'w-[33%] pb-[33%] overflow-hidden',
    'not-feed': `w-[90px] pb-[120px]`,
  };

  return (
    <div
      onClick={feed ? onImageClick : undefined}
      className={`${
        feed ? imageSize[feed] : imageSize['not-feed']
      } h-0 relative`}
    >
      <img
        className='absolute t-0 l-0 w-[100%] h-[100%]'
        ref={imgRef}
        src={loaded ? src : placeholder}
        alt={alt}
      />
    </div>
  );
};

export default BookImage;
