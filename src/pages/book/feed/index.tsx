import Image from 'next/image';
import React from 'react';

const DUMMY = ['심리학', '미움받을용기', '배고픔'];

const BookDetailFeed = () => {
  return (
    <div className='flex flex-col bg-[#fbfbfb] gap-4 px-4 py-16 overflow-scroll'>
      <section className='w-32 h-[18px] flex items-center justify-between'></section>
      <section className='w-full h-10 flex justify-between items-center'>
        <article className='flex items-center'>
          <div className='h-10 w-10 border mr-2 rounded-[50%] border-solid border-[black] s'>
            <Image src='' alt='프로필 이미지' width={40} height={40} />
          </div>
          <h3>문학소녀</h3>
        </article>
        <div>2023.05.26</div>
      </section>
      <section className='w-full h-[22rem] border rounded-md border-solid border-[green]'>
        <Image src='' alt='피드 이미지' width={352} height={352} />
      </section>
      <article className='w-full leading-[160%] text-[15px] rounded-md'>
        이 책을 읽고 마음에 깊이 와 닿았던 부분이 있습니다. 지금 이 순간 밖에는
        살지 못한다. 어쨌든 아침에 눈을 뜨면 오늘이라는 날을 위해 산다. 할 수
        있는 건 그것 뿐이다. 인간의 가치는 생산성이 아니라 산다는 데 있다. 지금
        살아 있다는 건 감사한 일이다. 과걸 돌아보며 후회하거나 앞날을 생각하며
        불안해 할 이유가 없다. 후회하지도 불안해 하지도 말고 오늘이라는 날을
        한발한발 내디디며 살아가자.
      </article>
      <ul className='inline-flex w-full flex-wrap'>
        {DUMMY.map((item) => (
          <li
            className='flex justify-center items-center border italic font-normal text-[13px] text-[#333333] mr-2 px-3 py-[5px] rounded-[50px] border-solid border-[#ebeaea]'
            key={item}
          >
            #{item}
          </li>
        ))}
      </ul>
      <section className='flex flex-col w-full'>
        <h2 className='not-italic font-normal text-base text-[#242424] mb-4'>
          도서 정보
        </h2>
        <article className='h-24 flex gap-4 p-4 rounded-md'>
          <div className='border w-1/5 border-solid border-[red]'>
            <Image src='' alt='책 표지' width={20} height={40} />
          </div>
          <div className='w-4/5 flex flex-col justify-evenly'>
            <h1 className='text-base'>아직 긴 인생이 남았습니다.</h1>
            <h3 className='text-[13px] text-[#999797]'>기시미이치로</h3>
          </div>
        </article>
      </section>
    </div>
  );
};

export default BookDetailFeed;
