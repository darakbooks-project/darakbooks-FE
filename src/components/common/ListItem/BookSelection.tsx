import BookImage from '../BookImage';
import Button from '../Button';

const BookSelection = ({ src, text, imageSize, buttonSize }) => {
  return (
    <div className='w-[100%] flex justify-between items-center bg-yellow-600 px-[20px] py-[10px]'>
      <div className='flex items-center'>
        <BookImage
          lazy={true}
          src={src}
          placeholder='스켈레톤'
          alt='책 선택 리스트 아이템의 사진 입니다.'
          feed={imageSize}
        />
        <div className='ml-[15px] font-bold'>{text}</div>
      </div>
      <Button size={buttonSize} color='gray'>
        선택
      </Button>
    </div>
  );
};

export default BookSelection;
