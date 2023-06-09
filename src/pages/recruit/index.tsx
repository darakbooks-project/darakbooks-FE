import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

import { getReadingClassData } from '@/api/recruit';
import RecruitInfinityScrollLists from '@/components/recruit/RecruitInfinityScrollLists';

const RecruitPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <h1>독서 인원 모집 페이지</h1>
      {isMounted && <RecruitInfinityScrollLists />}
      <PersonnelRecruitButton href='/recruit/write'>
        독서 인원 모집 글 작성
      </PersonnelRecruitButton>
    </>
  );
};

export default RecruitPage;

const PersonnelRecruitButton = tw(Link)`
  fixed
  bottom-0
  right-0
  w-full
  bg-blue-500
  text-center
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(['reading', 'group', 'list'], () =>
    getReadingClassData(1),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
