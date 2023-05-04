import { useEffect, useRef, useState } from 'react';

import { DEFAULT_IMAGE } from '@/constants/image';

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

interface ImageComponentProps {
  lazy: boolean;
  threshold?: number;
  placeholder: string;
  src: string;
  size: string;
  alt: string;
  onImageClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface imageSizeType {
  [key: string]: string;
}

const ImageComponent = ({
  lazy,
  threshold = 0.5,
  placeholder,
  src,
  size,
  alt,
  onImageClick,
}: ImageComponentProps) => {
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
    'feed-large': 'aspect-square w-[100%]',
    'feed-medium': 'aspect-square w-[50%]',
    'feed-small': 'aspect-square w-[33%]',
    'not-feed-large': `w-[240px] h-[320px]`,
    'not-feed-medium': `w-[120px] h-[160px]`,
    'not-feed-small': `w-[72px] h-[96px]`,
  };

  return (
    <div
      onClick={size ? onImageClick : undefined}
      className={`${imageSize[size]}`}
    >
      <img
        className='w-[100%] h-[100%]'
        ref={imgRef}
        src={loaded ? (src ? src : DEFAULT_IMAGE) : placeholder}
        alt={alt}
      />
    </div>
  );
};

export default ImageComponent;
