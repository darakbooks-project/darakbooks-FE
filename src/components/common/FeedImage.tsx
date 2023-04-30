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
  type: number;
  alt: string;
  onFeedImageClick: React.MouseEventHandler<HTMLDivElement>;
}

interface imageSizeType {
  [key: number]: string;
}

const FeedImage = ({
  lazy,
  threshold,
  placeholder,
  src,
  type,
  alt,
  onFeedImageClick,
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

  return (
    <div
      onClick={onFeedImageClick}
      className={`${`w-[${Math.round(100 / type)}%] pb-[${Math.round(
        100 / type,
      )}%]`} h-0 relative overflow-hidden`}
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

export default FeedImage;
