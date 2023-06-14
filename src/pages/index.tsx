import { Fragment } from 'react';

import BookShelfPreview from '@/components/common/BookShelfPreview';
import BottomNav from '@/components/common/BottomNav';
import BestRecruitList from '@/components/main/BestRecruit.tsx/BestRecruitList';
import FeedItem from '@/components/main/FeedItem';

import image1 from '../../public/images/bookCover/image1.jpg';
import image2 from '../../public/images/bookCover/image2.jpg';
import image3 from '../../public/images/bookCover/image3.jpg';

const BOOKSHELFDUMMY = {
  memberId: '1',
  nickname: '짱쎈심청이',
  images: [image1, image2, image3],
};

const FEEDDUMMY = [
  {
    memberId: 1,
    title: '심청전',
    recode:
      '어른이 되어서 다시 읽는 심청전은 색달랐다.어른이 되어서 다시 읽는 심청전은 색달랐다.어른이 되어서 다시 읽는 심청전은 색달랐다.어른이 되어서 다시 읽는 심청전은 색달랐다.어른이 되어서 다시 읽는 심청전은 색달랐다.어른이 되어서 다시 읽는 심청전은 색달랐다.어른이 되어서 다시 읽는 심청전은 색달랐다.어른이 되어서 다시 읽는 심청전은 색달랐다.어른이 되어서 다시 읽는 심청전은 색달랐다.',
    nickname: '문학소녀',
    image: './images/bookCover/image1.jpg',
    localImg: image1,
  },
  {
    memberId: 2,
    title: '수박수영장',
    recode: '여름이면 생각나는 그림책',
    nickname: '책 먹는 여우',
    image: './images/bookCover/image2.jpg',
    localImg: image2,
  },
  {
    memberId: 3,
    title: '제목제목',
    recode: '글글글',
    nickname: '책 먹는 여우',
    image: './images/bookCover/image3.jpg',
    localImg: image3,
  },
];

export default function Home() {
  return (
    <main>
      <section className='bg-[#C6BDA4] h-[17.125rem]'>
        <div className='relative ml-5 text-white top-44'>
          <p className='text-3xl font-bold'>어서오세요</p>
          <p className='text-base'>오늘은 어떤 책을 읽으셨나요?</p>
        </div>
      </section>
      <section className='mt-14'>
        <p className='text-sm mx-5 font-bold text-[#67A68A]'>
          오늘의 나를 위한 도서 선택
        </p>
        <h1 className='mx-5 mb-5 text-xl font-bold'>인기서재 추천</h1>
        <div className='mx-5'>
          <BookShelfPreview
            key={BOOKSHELFDUMMY.memberId}
            nickname={BOOKSHELFDUMMY.nickname}
            imageSrcArr={BOOKSHELFDUMMY.images}
            memberId={BOOKSHELFDUMMY.memberId}
          />
        </div>
      </section>
      <BestRecruitList />
      <section className='mt-10'>
        <p className='text-sm mx-5 font-bold text-[#67A68A]'>
          요즘 푹 빠져있는 관심사
        </p>
        <h1 className='mx-5 mb-5 text-xl font-bold'>콘텐츠 추천</h1>
        <div className='mx-5'>
          {FEEDDUMMY.map((feed) => (
            <Fragment key={feed.memberId}>
              <FeedItem {...feed} />
            </Fragment>
          ))}
        </div>
      </section>
      <BottomNav />
    </main>
  );
}
