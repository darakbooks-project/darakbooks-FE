import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { fetchBestGroup } from '@/api/main';
import BookShelfPreview from '@/components/common/BookShelfPreview';
import BottomNav from '@/components/common/BottomNav';
import BestRecruitList from '@/components/main/bestRecruit/BestRecruitList';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
import { isRendedOnboardingAtom } from '@/recoil/onboarding';
import { BestGroupListType } from '@/types/recruit';
const RecordFeedList = dynamic(
  () => import('@/components/main/mainRecordFeed/RecordFeedList'),
);

interface MainSSRProps {
  bestGroup: BestGroupListType[];
}

export default function Home({ bestGroup }: MainSSRProps) {
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const { openAuthRequiredModal } = useAuth();

  const { push } = useRouter();

  const [isRendedOnboarding, setIsRendedOnboarding] = useRecoilState(
    isRendedOnboardingAtom,
  );

  useEffect(() => {
    moveOnboardingPage();
  }, []);

  const handleMoveRecommendPage = () => {
    if (!isAuthorized) return openAuthRequiredModal();

    push('/recommend');
  };

  const moveOnboardingPage = () => {
    if (!isAuthorized && !isRendedOnboarding) {
      push('/onboarding');
      return <></>;
    }

    setIsRendedOnboarding(false);
  };

  return (
    <div className='pb-20 bg-white text-textBlack'>
      <section className='relative w-full'>
        <Image
          src='/images/main/main-banner.svg'
          width={390}
          height={274}
          alt='메인 안내 배너'
          className='w-full'
          priority
        />
        <Image
          src='/images/main/main-logo.svg'
          width={67}
          height={20}
          alt='메인 로고'
          className='absolute w-[18%] max-w-[6.25rem] ml-5 top-12'
          priority
        />
        <div className='absolute ml-5 bottom-6 left-12%'>
          <p className='font-bold text-[1.75rem] text-main xxs:text-lg'>
            어서오세요
          </p>
          <p className='text-clampSm'>오늘은 어떤 책을 읽으셨나요?</p>
        </div>
      </section>
      <section className='mx-5 mt-14'>
        <p className='font-medium text-clampSm text-main'>
          오늘의 나를 위한 도서 선택
        </p>
        <h1 className='mb-5 font-bold text-clampXl'>맞춤 서재 추천</h1>
        <BookShelfPreview />
      </section>
      <BestRecruitList BestGroupList={bestGroup} />
      <section className='relative mt-12'>
        <Image
          src='/images/main/gpt-recommend.svg'
          width={390}
          height={314}
          alt='메인 안내 배너'
          className='w-full'
        />
        <div className='absolute bottom-[calc(50%-6.25rem)] flex flex-col justify-center items-center w-full xxs:bottom-7'>
          <h2 className='font-bold text-clampLg]'>
            무슨 책을 읽을지 고민이신가요?
          </h2>
          <p className=' text-clampBase text-[#707070] pb-4'>
            나만의 특별한 북 큐레이팅을 경험해보세요.
          </p>
          <button
            onClick={handleMoveRecommendPage}
            className='flex justify-center items-center text-main border rounded-[50px] pl-2 py-2 border-main text-clampSm'
          >
            북 큐레이팅 시작하기
            <Image
              src='/images/main/gpt-move.svg'
              width={32}
              height={32}
              alt='gpt 페이지 이동 아이콘'
              className='xxs:w-5'
            />
          </button>
        </div>
      </section>
      <section className='mt-10'>
        <p className='mx-5 text-sm font-medium text-main'>
          요즘 푹 빠져있는 관심사
        </p>
        <h1 className='mx-5 mb-5 font-bold text-clampXl'>따끈따끈한 기록들</h1>
        <RecordFeedList />
      </section>
      <BottomNav />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  bestGroup: BestGroupListType | unknown;
}> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['bestGroup'], fetchBestGroup);
  const bestGroup = dehydrate(queryClient).queries[0].state.data;

  return {
    props: {
      bestGroup,
    },
  };
};
