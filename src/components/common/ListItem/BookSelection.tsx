import Button from '../Button';
import BookImage from '../ImageComponent';

interface BookSelectionProps {
  src: string;
  title: string;
  imageSize: string;
  buttonSize: 'small' | 'medium' | 'large';
}

const BookSelection = ({
  src,
  title,
  imageSize,
  buttonSize,
}: BookSelectionProps) => {
  return (
    <div className='w-[100%] flex justify-between items-center bg-yellow-400 px-[20px] py-[15px]'>
      <div className='flex items-center'>
        <BookImage
          lazy={true}
          src={src}
          placeholder='스켈레톤'
          alt='책 선택 리스트 아이템의 사진 입니다.'
          size={imageSize}
        />
        <div className='ml-[15px] font-bold'>{title}</div>
      </div>
      <Button size={buttonSize} color='gray'>
        선택
      </Button>
    </div>
  );
};

export default BookSelection;
