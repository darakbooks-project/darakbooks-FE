import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';

interface ButtonType {
  src: string;
  text: string;
  path: string;
  as?: string;
}

const BottomNav = () => {
  const { openAuthRequiredModal } = useAuth();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);

  const { push, pathname } = useRouter();

  const navItemPropertyArr: ButtonType[] = [
    {
      path: '/?isRendedOnboarding=true',
      as: '/',
      text: '홈',
      src: 'home',
    },
    {
      path: '/book/search',
      text: '검색',
      src: 'search',
    },
    {
      path: '/book/record',
      as: '/',
      text: '기록',
      src: 'record',
    },
    {
      path: '/recruit',
      text: '모임',
      src: 'group',
    },
    {
      path: isAuthorized ? '/profile' : '/login',
      text: isAuthorized ? '마이' : '로그인',
      src: 'profile',
    },
  ];

  const moveBottomNavPage = (path: string, src: string, as?: string) => {
    if (src === 'record' && !isAuthorized) return openAuthRequiredModal();
    push(path, as && as);
  };

  return (
    <Container>
      <Wrap>
        {navItemPropertyArr.map((button: ButtonType) => {
          const { path, text, src, as } = button;
          const isClickedPath = src === 'home' ? '/' : path;
          const isClicked = isClickedPath === pathname;

          return (
            <Button onClick={() => moveBottomNavPage(path, src, as)} key={src}>
              <Image
                width={45}
                height={45}
                alt='Bottom Nav Bar 아이콘 입니다'
                src={`../images/bottomNavBar/${src}-${
                  isClicked ? 'on' : 'off'
                }.svg`}
              />
              <Text isClick={isClicked ? 'click' : ''}>{text}</Text>
            </Button>
          );
        })}
      </Wrap>
    </Container>
  );
};

export default BottomNav;

const Container = tw.nav`
  fixed
  bottom-[-1px]
  left-[50%]
  translate-x-[-50%]
  w-full
  h-20
  bg-white
  max-w-xl
  flex
  items-center
  border-t
  border-black
  border-opacity-10
`;

const Wrap = tw.div`
  flex
  items-center
  justify-around
  w-full
`;

const Button = tw.button`
  flex
  flex-col
  items-center
  cursor-pointer
`;

const Text = tw.div<{ isClick: string }>`
  text-xs	
  mt-[-5px]
  ${(props) => (props.isClick === 'click' ? 'text-[#60B28D]' : 'text-[#707070')}
`;
