import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';

import BottomNav from '@/components/common/BottomNav';
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
        나만의 독서 모임 만들기
      </PersonnelRecruitButton>

      <BottomNav />
    </Container>
  );
};

export default RecruitPage;

const Container = tw.div``;

const BackGroundWrap = tw.div`
  fixed
  top-0
  left-[50%]
  translate-x-[-50%]
  max-w-xl
  w-full
  h-[15.313rem]
  bg-[#FFFCEA]
  z-10
`;
const BackGround = tw.div`
  w-full
  h-[15.313rem]
  relative
  bg-[url('/images/reading-group-illustration.svg')]
`;

const Title = tw.h1`
  absolute
  left-5
  bottom-9
  text-xl
  font-bold
`;

const InfinityScrollListsWrap = tw.div`
  pt-72
  pb-24
  bg-white
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
  py-2.5
  px-5
  bg-main
  text-sm
  text-center
  text-white
  rounded-lg
  cursor-pointer
  shadow-lg
`;
