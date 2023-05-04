import Link from 'next/link';
import { useRouter } from 'next/router';

const BottomNav = () => {
  const navItemPropertyArr = [
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
        {navItemPropertyArr.map((button, index) => {
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
