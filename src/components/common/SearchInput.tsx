import Image from 'next/image';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

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
    <Container>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Input
          type='text'
          placeholder='검색어를 입력해주세요'
          onChange={updateInputData}
        />
        <Button type='submit' className='' onClick={onClickSearchButton}>
          <Image
            src='../images/search.svg'
            width={20}
            height={20}
            alt='검색 아이콘'
          />
        </Button>
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
`;

const Input = tw.input`
  w-[90%]
  rounded-r-lg
  outline-none
  pl-2
  py-[12.5px]
  bg-[#F2F2F2]
  text-sm
`;

const Button = tw.button`
  w-[10%]
  flex 
  justify-center 
  items-center 
  rounded-l-lg
  bg-[#F2F2F2]
  pl-2
`;

const ErrorMessage = tw.div`
  absolute
  bottom-[-30px]
`;
