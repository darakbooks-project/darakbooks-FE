import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';

import BottomNav from '@/components/common/BottomNav';
import Seo from '@/components/common/Seo';
import RecruitInfinityScrollLists from '@/components/recruit/RecruitInfinityScrollLists';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
import { readingGroupInfinityScrollPositionAtom } from '@/recoil/recruit';

const RecruitPage = () => {
  const { openAuthRequiredModal } = useAuth();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const setInfinityScrollPosition = useSetRecoilState(
    readingGroupInfinityScrollPositionAtom,
  );
  const {
    push,
    query: { listchangetype },
  } = useRouter();

  const clickGroupOpenButton = () => {
    if (!isAuthorized) {
      openAuthRequiredModal();
      return;
    }

    setInfinityScrollPosition(window.scrollY);
    push('/recruit/write');
  };

  return (
    <>
      <Seo
        title='다락책방 | 독서 모임 조회'
        description='독서인들의 모임 생성 및 조회를 위한 공간'
      />
      <Container>
        <BackGroundWrap>
          <BackGround>
            <Title>
              독서모임 시작하기 <br /> 참 좋은 하루에요
              <span className='ml-1'>:)</span>
            </Title>
          </BackGround>
        </BackGroundWrap>

        <InfinityScrollListsWrap>
          <InfinityScrollLists>
            <RecruitInfinityScrollLists
              listchangetype={
                typeof listchangetype === 'string' ? listchangetype : ''
              }
            />
          </InfinityScrollLists>
        </InfinityScrollListsWrap>

        <PersonnelRecruitButton onClick={clickGroupOpenButton}>
          <Image
            src='/images/group/people-white.svg'
            width={32}
            height={32}
            alt='독서 모임 개설 아이콘'
          />
          <span className='text-clampSm'>나만의 독서 모임 만들기</span>
        </PersonnelRecruitButton>

        <BottomNav />
      </Container>
    </>
  );
};

export default RecruitPage;

const Container = tw.div`
  h-full
`;

const BackGroundWrap = tw.div`
  relative
  top-0
  left-[50%]
  translate-x-[-50%]
  max-w-xl
  w-full
  h-[15.313rem]
`;

const BackGround = tw.div`
  w-full
  h-[15.313rem]
  relative
  bg-[url('/images/group/reading-group-illustration.svg')]
`;

const Title = tw.h1`
  absolute
  left-5
  bottom-9
  text-clampXl
  font-medium	
`;

const InfinityScrollListsWrap = tw.main`
  pt-10
  pb-28
  bg-white
  h-4/6
`;

const InfinityScrollLists = tw.div`
  w-[90%]
  mx-auto	
`;

const PersonnelRecruitButton = tw.div`
  fixed
  bottom-24
  left-[50%]
  translate-x-[-50%]
  py-2
  px-5
  bg-main
  text-center
  text-white
  rounded-[0.6rem]
  cursor-pointer
  shadow-lg
  font-medium

  flex
  justify-center
  items-center
  w-[60%]
  max-w-xs
`;
