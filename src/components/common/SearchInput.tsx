import Image from 'next/image';
import { useState } from 'react';

interface Props {
  onSubmit(keywrod: string): void;
}

const SearchInput = ({ onSubmit }: Props) => {
  const [inputData, setInputData] = useState('');
  const [isError, setIsError] = useState(false);

  const updateInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  const onClickSearchButton = () => {
    onSubmit(inputData);

    if (!inputData) {
      setIsError(true);
      return;
    }

    if (isError) {
      setIsError(false);
    }
  };

  return (
    <div>
      <form
        className='flex w-[100%] h-[50px] flex-row-reverse'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className='w-[85%] border border-solid border-black rounded-r-xl outline-none pl-2'
          type='text'
          placeholder='검색어를 입력해주세요'
          onChange={updateInputData}
        />
        <button
          type='submit'
          className='w-[15%] border border-solid border-black bg-gray-300 flex justify-center items-center rounded-l-xl border-r-0'
          onClick={onClickSearchButton}
        >
          <Image
            src='../images/search.svg'
            width={35}
            height={35}
            alt='검색 아이콘'
          />
        </button>
      </form>
      <div>{isError && '한글자 이상의 검색어를 입력해주세요'}</div>
    </div>
  );
};

export default SearchInput;
