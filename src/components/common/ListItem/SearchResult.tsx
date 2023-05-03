import BookImage from '../BookImage';

const SearchResult = () => {
  return (
    <div className='w-[100%] flex justify-between items-center bg-yellow-600 px-[20px] py-[10px]'>
      <BookImage
        lazy={true}
        src='https://image.yes24.com/momo/TopCate420/MidCate010/41997675(1).jpg'
        placeholder='스켈레톤'
        alt='책 선택 리스트 아이템의 사진 입니다.'
        feed='not-feed-small'
      />
      <div className='flex flex-col font-bold text-[15px]'>
        <span>미움 받을 용기</span>
        <span>기시미 이치로, 고가 후미타케</span>
        <span>인플루엔셜</span>
      </div>
    </div>
  );
};

export default SearchResult;
