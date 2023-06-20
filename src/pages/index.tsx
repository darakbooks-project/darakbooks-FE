import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { fetchBestGroup } from '@/api/main';
import BookShelfPreview from '@/components/common/BookShelfPreview';
import BottomNav from '@/components/common/BottomNav';
import BestRecruitList from '@/components/main/bestRecruit/BestRecruitList';
import RecordFeedList from '@/components/main/mainRecordFeed/RecordFeedList';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
import { BestGroupListType } from '@/types/recruit';

import image1 from '../../public/images/bookCover/image1.jpg';
import image2 from '../../public/images/bookCover/image2.jpg';
import image3 from '../../public/images/bookCover/image3.jpg';

const BOOKSHELFDUMMY = {
  memberId: '1',
  nickname: '짱쎈심청이',
  images: [image1, image2, image3],
};

export default function Home({
  bestGroup,
}: {
  bestGroup: BestGroupListType[];
}) {
  const { openAuthRequiredModal } = useAuth();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const {
    query: { isRendedOnboarding },
    push,
  } = useRouter();

  const handleMoveRecommendPage = () => {
    if (!isAuthorized) return openAuthRequiredModal();

    push('/recommend');
  };

  if (!isAuthorized && !isRendedOnboarding) {
    push('/onboarding');
    return <></>;
  }

  return (
    <main>
      <section className='bg-[#C6BDA4] h-[17.125rem]'>
        <div className='relative ml-5 text-white top-44'>
          <p className='text-3xl font-bold'>어서오세요</p>
          <p className='text-base'>오늘은 어떤 책을 읽으셨나요?</p>
        </div>
      </section>
      <section className='mx-5 mt-14'>
        <p className='text-sm font-bold text-main'>
          오늘의 나를 위한 도서 선택
        </p>
        <h1 className='mb-5 text-xl font-bold'>인기서재 추천</h1>
        <BookShelfPreview
          key={BOOKSHELFDUMMY.memberId}
          nickname={BOOKSHELFDUMMY.nickname}
          imageSrcArr={BOOKSHELFDUMMY.images}
          memberId='2823683088'
        />
      </section>
      <BestRecruitList BestGroupList={bestGroup} />
      <section>
        <div onClick={handleMoveRecommendPage} className='mx-5 bg-white'>
          추천 페이지로 이동
        </div>
      </section>
      <section className='mt-10'>
        <p className='mx-5 text-sm font-bold text-main'>
          요즘 푹 빠져있는 관심사
        </p>
        <h1 className='mx-5 mb-5 text-xl font-bold'>콘텐츠 추천</h1>
        <RecordFeedList />
      </section>
      <BottomNav />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  bestGroup: BestGroupListType | unknown;
}> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['bestGroup'], fetchBestGroup);

  const data = dehydrate(queryClient).queries[0].state.data;

  return {
    props: {
      bestGroup: data,
    },
  };
};
