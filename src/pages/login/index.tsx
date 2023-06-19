import Image from 'next/image';
import Link from 'next/link';
import tw from 'tailwind-styled-components';

import LoginButton from '@/components/auth/LoginButton';

const LoginPage = () => {
  return (
    <Container>
      <Wrap>
        <Introduce>
          <SiteImage
            src='./images/login-image.svg'
            width={200}
            height={400}
            alt='로그인 페이지 사진'
          />
          <SiteName>다락책방</SiteName>
          <SiteDescrtion>책을 통해 함께 지식을 쌓아봐요~</SiteDescrtion>
        </Introduce>

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
          <LinkStyles href='/'>일단 둘러보기</LinkStyles>
        </UserSelectWrapper>
      </Wrap>
    </Container>
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

const Introduce = tw.div`
  text-center
`;

const SiteImage = tw(Image)`
  mx-auto
`;

const SiteName = tw.div``;

const SiteDescrtion = tw.div``;

const UserSelectWrapper = tw.div`
  w-full
  text-center
`;

const QuestionText = tw.div`
`;

const ButtonItem = tw.div`
  w-[25%]
`;

const LinkStyles = tw(Link)`
  text-sm	
  text-[#707070]
  border-b	
  border-[#707070]
`;
