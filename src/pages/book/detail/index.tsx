import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DUMMY = [
  { id: '1', description: '하이하이', nickname: '하이1' },
  { id: '2', description: '바이바이', nickname: '바이1' },
];

const BookDetailPage = () => {
  return (
    <div className='flex flex-col gap-2.5 pb-2.5 '>
      <section className='h-[30rem] border border-solid  bg-[#ffffff]'>
        <div className='absolute w-44 h-64 left-[calc(50%_-_170px_/_2)] rounded-[0px_3px_3px_0px] top-[107px] drop-shadow-xl border-basic'>
          <Image src='' alt='테스트' fill />
        </div>
        <article className='absolute w-[175px] h-[74px] left-[calc(50%_-_175px_/_2_+_0.5px)] flex flex-col items-center gap-[5px] top-[380px]'>
          <h1 className='text-xl font-semibold'>아들러의 성격 상담소</h1>
          <h3 className='text-[13px]'>기시미 이치로 지음</h3>
          <h4 className='text-[13px] text-[#999797]'>생각의 날개</h4>
        </article>
      </section>
      <section className='border p-4 border-solid bg-[#ffffff]'>
        <h2 className='not-italic font-bold text-xl leading-[29px] mb-4'>
          책 소개
        </h2>
        <p className='not-italic font-normal text-[15px] leading-[22px] text-justify text-[#707070]'>
          내 성격은 도대체 왜 이럴까? 성격은 정말 팔자인 걸까? 타고난 성격을
          바꾸는 일은 불가능할까? 내일은 행복해지고 싶은 당신을 위한 아들러식
          카운슬링. 어쩌자고 이런 성격일까 싶다면, 이 책을 한번 읽어보자!
        </p>
      </section>
      <section className='border p-4 border-solid bg-[#ffffff]'>
        <h2 className='not-italic font-bold text-xl leading-[29px] mb-4'>
          관련 기록
        </h2>
        <ul className='flex flex-col items-center'>
          {DUMMY.map((item) => (
            <li
              className='w-full flex justify-between mb-4 px-0 py-4 border-b-[#ebeaea] border-b border-solid'
              key={item.id}
            >
              <div className='flex flex-col justify-between w-9/12'>
                <p className='text-[#333333] text-[13px]'>{item.description}</p>
                <h3 className='text-[#707070] text-[13px]'>
                  @ {item.nickname}
                </h3>
              </div>
              <div className='border w-16 h-16 border-solid border-[blue]'>
                <Image src='' alt='테스트2' width={64} height={64} />
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className='flex justify-evenly items-center w-full px-0 py-4 bg-[#ffffff]'>
        <button className='flex justify-center items-center box-border w-28 h-16 shadow-[4px_4px_8px_rgba(0,0,0,0.15)] not-italic font-bold text-base leading-[19px] text-[#5a987d] rounded-md border-2 border-solid border-[#5a987d]'>
          담기
        </button>
        <button className='flex justify-center items-center box-border w-28 h-16 shadow-[4px_4px_8px_rgba(0,0,0,0.15)] not-italic font-bold text-base leading-[19px] text-[#5a987d] rounded-md border-2 border-solid border-[#5a987d]'>
          <Link
            href={{ pathname: '/book/record', query: { isbn: '1168340772' } }}
          >
            바로기록하기
          </Link>
        </button>
      </section>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(['bookList'], fetchDummy);
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default BookDetailPage;
