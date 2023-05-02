import Image from 'next/image';
import { useState } from 'react';

const SearchInput = () => {
  return (
    <div className='flex w-[100%] h-[50px] flex-row-reverse'>
      <input
        className='w-[85%] border border-solid border-black rounded-r-xl outline-none pl-2'
        type='text'
        placeholder='검색어를 입력해주세요'
      />
      <button className='w-[15%] border border-solid border-black bg-gray-300 flex justify-center items-center rounded-l-xl border-r-0'>
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
