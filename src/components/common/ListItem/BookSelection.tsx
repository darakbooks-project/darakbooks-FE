import BookImage from '../BookImage';
import Button from '../Button';

const BookSelection = () => {
  return (
    <div className='w-[100%] flex justify-between items-center bg-yellow-600 px-[20px] py-[10px]'>
      <div className='flex items-center'>
        <BookImage
          lazy={true}
          src='https://image.yes24.com/momo/TopCate420/MidCate010/41997675(1).jpg'
          placeholder='스켈레톤'
          alt='책 선택 리스트 아이템의 사진 입니다.'
          feed='not-feed-small'
        />
        <div className='ml-[15px] font-bold'>미움 받을 용기</div>
      </div>
      <Button size='small' color='gray'>
        선택
      </Button>
    </div>
  );
};

export default BookSelection;
