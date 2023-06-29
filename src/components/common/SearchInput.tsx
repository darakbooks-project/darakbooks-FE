import Image from 'next/image';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

interface Props {
  onSubmit(keywrod: string): void;
  inputText?: string;
}

const SearchInput = ({ onSubmit, inputText }: Props) => {
  const [inputData, setInputData] = useState(inputText);
  const [isError, setIsError] = useState(false);

  const updateInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  const removeInputData = () => {
    setInputData('');
  };

  const onClickSearchButton = () => {
    if (!inputData) return setIsError(true);

    onSubmit(inputData);
    if (isError) setIsError(false);
  };

  return (
    <Container>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Input
          type='text'
          placeholder='책 검색'
          onChange={updateInputData}
          value={inputData}
        />
        <SearchButton type='submit' onClick={onClickSearchButton}>
          <Image
            src='/images/bookSearch/search.svg'
            width={32}
            height={32}
            alt='검색 아이콘'
          />
        </SearchButton>
        <CloseButton onClick={removeInputData}>
          <Image
            src='/images/bookSearch/clear.svg'
            width={32}
            height={32}
            alt='입력 텍스트 제거 아이콘'
          />
        </CloseButton>
      </Form>
      <ErrorMessage>
        {isError && '한글자 이상의 검색어를 입력해주세요'}
      </ErrorMessage>
    </Container>
  );
};

export default SearchInput;

const Container = tw.div``;

const Form = tw.form`
  flex
  w-[100%]
  flex-row-reverse
  relative
`;

const Input = tw.input`
  w-[90%]
  rounded-r-lg
  outline-none
  pl-2
  py-[0.781rem]
  bg-[#F2F2F2]
  text-sm
`;

const SearchButton = tw.button`
  w-[10%]
  flex 
  justify-center 
  items-center 
  rounded-l-lg
  bg-[#F2F2F2]
  pl-2
`;

const CloseButton = tw.button`
  absolute
  top-2
  right-2.5
`;

const ErrorMessage = tw.div`
  absolute
  bottom-[-30px]
`;
