import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';

import LoginButton from '@/components/auth/LoginButton';
import Seo from '@/components/common/Seo';
import { isAuthorizedSelector } from '@/recoil/auth';
import { isRendedOnboardingAtom } from '@/recoil/onboarding';

const LoginPage = () => {
  const { back, push } = useRouter();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const setIsRendedOnboarding = useSetRecoilState(isRendedOnboardingAtom);

  useEffect(() => {
    if (isAuthorized) back();
  }, [isAuthorized, back]);

  const moveMainPage = () => {
    push('/');
    setIsRendedOnboarding(true);
  };

  return (
    !isAuthorized && (
      <>
        <Seo
          title='다락책방 | 로그인'
          description='간편한 소셜 로그인을 통해 다락책방을 이용해보세요'
        />
        <Container>
          <Wrap>
            <div></div>
            <SiteLogo
              src='./images/login-logo.svg'
              width={160}
              height={160}
              priority={true}
              alt='로그인 페이지 로고'
            />
            <UserSelectWrapper>
              <QuestionText>
                발견하고 기록하고 소통하는 <br /> 나만의 작은 책방
              </QuestionText>
              <LoginButton>
                <ButtonItem>
                  <Image
                    src='./images/kakao-logo.svg'
                    width={17.5}
                    height={17.5}
                    alt='카카오 로고 사진'
                  />
                </ButtonItem>
                <ButtonItem className='text-center w-[50%]'>
                  카카오로 시작하기
                </ButtonItem>
                <ButtonItem></ButtonItem>
              </LoginButton>
              <LinkStyles onClick={moveMainPage}>일단 둘러보기</LinkStyles>
            </UserSelectWrapper>
          </Wrap>
        </Container>
      </>
    )
  );
};

export default LoginPage;

const Container = tw.div`
  bg-[#FFFEF8]
  h-full
`;

const Wrap = tw.div`
  w-[90%]
  h-full
  flex
  flex-col
  justify-between
  items-center
  mx-auto
  py-14
`;

const SiteLogo = tw(Image)`
  mx-auto
`;

const UserSelectWrapper = tw.div`
  w-full
  text-center
`;

const QuestionText = tw.div`
  text-[0.9375rem]
`;

const ButtonItem = tw.div`
  font-semibold
  w-[25%]
`;

const LinkStyles = tw.button`
  text-sm	
  text-textGray
  border-b	
  border-textGray
`;
