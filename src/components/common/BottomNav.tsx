import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';

interface ButtonType {
  src: string; // by 민형, 디자인에서 이미지 아이콘 정해지면 클릭여부에 따라 아이콘 설정하는 함수 type으로 변경_230504
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
      text: '메인',
      // by 민형, 디자인에서 이미지 아이콘 정해지면 아이콘 url 설정_230504
      src: '',
    },
    {
      path: '/book/search',
      text: '검색',
      src: '',
    },
    {
      path: isAuthorized ? '/book/record' : '',
      text: '기록',
      src: '',
      onClick: () => {
        isAuthorized || openAuthRequiredModal();
      },
    },
    {
      path: '/recommend/random',
      text: '추천',
      src: '',
    },
    {
      path: '/recruit',
      text: '모집',
      src: '',
    },
  ];

  return (
    <nav className='fixed left-[50%] bottom-0 translate-x-[-50%] w-full h-[4rem] bg-yellow-200 max-w-3xl flex items-centerr'>
      <div className='flex items-center justify-around w-full'>
        {navItemPropertyArr.map((button: ButtonType, index: number) => {
          const { path, text, onClick } = button;
          const isClicked = path === pathname;

          return (
            <Link
              onClick={onClick}
              href={path}
              key={index}
              className={`cursor-pointer w-14 text-center ${
                isClicked ? 'bg-blue-300' : 'bg-red-300'
              }`}
            >
              {text}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
