import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

import BottomNav from '@/components/common/BottomNav';
import RecruitInfinityScrollLists from '@/components/recruit/RecruitInfinityScrollLists';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';

const RecruitPage = () => {
  const { openAuthRequiredModal } = useAuth();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const router = useRouter();

  const clickGroupOpenButton = () => {
    if (!isAuthorized) {
      openAuthRequiredModal();
      return;
    }

    router.push('/recruit/write');
  };

  return (
    <Container>
      <BackGroundWrap>
        <BackGround>
          <Title>
            독서모임 시작하기 <br /> 참 좋은 하루에요!
          </Title>
        </BackGround>
        <PersonnelRecruitButton onClick={clickGroupOpenButton}>
          개설 하기
        </PersonnelRecruitButton>
      </BackGroundWrap>

      <InfinityScrollListsWrap>
        <InfinityScrollLists>
          <RecruitInfinityScrollLists />
        </InfinityScrollLists>
      </InfinityScrollListsWrap>

      <BottomNav />
    </Container>
  );
};

export default RecruitPage;

const Container = tw.div``;

const BackGroundWrap = tw.div`
  fixed
  top-0
  left-0
  w-full
  h-[250px]
  bg-[#FFFCEA]
  z-10
`;
const BackGround = tw.div`
  w-full
  h-[250px]
  relative
`;

const Title = tw.h1`
  absolute
  left-[20px]
  bottom-[15px]
  text-xl
  font-bold
`;

const InfinityScrollListsWrap = tw.div`
  pt-[290px]
  pb-[60px]
  bg-white
`;

const InfinityScrollLists = tw.div`
  w-[90%]
  mx-auto	
`;

const PersonnelRecruitButton = tw.div`
  absolute
  top-[70px]
  right-[20px]
  p-[5px]
  bg-[#FFDF8D]
  text-sm
  text-center
  text-white
  rounded
`;
