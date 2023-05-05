import { useRouter } from 'next/router';
import React from 'react';

const Buttons = () => {
  const router = useRouter();

  return (
    <section className='border-basic flex justify-end'>
      <button className='border-basic'>책장에 담기</button>
      <button
        className='border-basic'
        onClick={() => {
          router.push({
            pathname: 'record',
            query: { bid: '도서아이디' },
          });
        }}
      >
        독서기록
      </button>
    </section>
  );
};

export default Buttons;
