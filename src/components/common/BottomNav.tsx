import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';

interface ButtonType {
  src: string;
  text: string;
  path: string;
  onClick?: () => void;
}

const BottomNav = () => {
  const { openAuthRequiredModal } = useAuth();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);

  const router = useRouter();
  const { pathname } = router;

  const navItemPropertyArr: ButtonType[] = [
    {
      path: '/',
      text: '홈',
      src: 'home',
    },
    {
      path: '/book/search',
      text: '검색',
      src: 'search',
    },
    {
      path: isAuthorized ? '/book/record' : '',
      text: '기록',
      src: 'record',
      onClick: () => {
        isAuthorized || openAuthRequiredModal();
      },
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

  return (
    <Container>
      <Wrap>
        {navItemPropertyArr.map((button: ButtonType) => {
          const { path, text, onClick, src } = button;
          const isClicked = path === pathname;

          return (
            <Button key={src} onClick={onClick}>
              <Image
                width={45}
                height={45}
                alt='Bottom Nav Bar 아이콘 입니다'
                src={`../images/bottomNavBar/${src}-${
                  isClicked ? 'on' : 'off'
                }.svg`}
              />
              <Text href={path} isclick={isClicked ? 'click' : ''}>
                {text}
              </Text>
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
  bottom-0
  left-[50%]
  translate-x-[-50%]
  w-full
  h-20
  bg-white
  max-w-xl
  flex
  items-center
`;

const Wrap = tw.div`
  flex
  items-center
  justify-around
  w-full
`;

const Button = tw.div`
  flex
  flex-col
  items-center
  cursor-pointer
`;

const Text = tw(Link)<{ isclick: string }>`
  text-xs	
  mt-[-5px]
  ${(props) => (props.isclick === 'click' ? 'text-[#60B28D]' : 'text-[#707070')}
`;
