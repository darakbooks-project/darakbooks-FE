import Image from 'next/image';
import { useState } from 'react';

interface Props {
  getSearchData(text: string): Array<any>; // fetch한 데이터의 type이 정해지지 않은 관계로 any로 설정
}

const SearchInput = ({ getSearchData }: Props) => {
  const [inputData, setInputData] = useState('');

  const updateInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  const onClickSearchButton = () => {
    getSearchData(inputData);
  };

  return (
    <div className='flex w-[100%] h-[50px] flex-row-reverse'>
      <input
        className='w-[85%] border border-solid border-black rounded-r-xl outline-none pl-2'
        type='text'
        placeholder='검색어를 입력해주세요'
        onChange={updateInputData}
      />
      <button
        className='w-[15%] border border-solid border-black bg-gray-300 flex justify-center items-center rounded-l-xl border-r-0'
        onClick={onClickSearchButton}
      >
        <Image
          src='./images/search.svg'
          width={35}
          height={35}
          alt='검색 아이콘'
        />
      </button>
    </div>
  );
};

export default SearchInput;
