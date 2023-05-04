import Link from 'next/link';
import { useRouter } from 'next/router';

interface ButtonType {
  src: string; // by 민형, 디자인에서 이미지 아이콘 정해지면 클릭여부에 따라 아이콘 설정하는 함수 type으로 변경_230504
  text: string;
  path: string;
  onClick?: () => void;
}

const BottomNav = () => {
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
      path: '/book/record',
      text: '기록',
      src: '',
      // by 민형, 비 로그인 유저가 클릭 시 로그인을 할 것인지 물어보는 작업을 수행하는 함수로 변경_230504
      onClick: () => console.log('기록 페이지로 가시려면 로그인이 필요합니다.'),
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

  const router = useRouter();
  const { pathname } = router;

  return (
    <nav className='fixed left-[50%] bottom-0 translate-x-[-50%] w-full h-[4rem] bg-yellow-200 max-w-3xl flex items-centerr'>
      <div className='flex justify-around items-center w-full'>
        {navItemPropertyArr.map((button: ButtonType, index: number) => {
          const { path, text } = button;
          const isClicked = path === pathname;

          return (
            <Link
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
