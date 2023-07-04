import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';

import LoginButton from '@/components/auth/LoginButton';
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
      <Container>
        <Wrap>
          <div></div>
          <SiteLogo
            src='./images/login-logo.svg'
            width={160}
            height={160}
            alt='로그인 페이지 로고'
          />
          <UserSelectWrapper>
            <QuestionText>
              3초만에 가입하고 <br /> 다락책방을 시작해볼까요?
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
`;

const ButtonItem = tw.div`
  w-[25%]
`;

const LinkStyles = tw.button`
  text-sm	
  text-[#707070]
  border-b	
  border-[#707070]
`;
