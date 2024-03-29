import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface Props {
  title?: string;
  moreMenu?: ReactNode;
  className?: string;
  pathname?: string;
}

const Header = ({ title, moreMenu, className, pathname }: Props) => {
  const {
    push,
    back,
    query: { listchangetype },
  } = useRouter();

  return (
    <header
      className={`flex items-center justify-between w-full max-w-xl px-5 h-14 ${
        className ?? ''
      }`}
    >
      <div className='flex-1'>
        <Image
          onClick={() => {
            pathname
              ? push({
                  pathname,
                  query: listchangetype && { listchangetype },
                })
              : back();
          }}
          src='/images/header/back-button.svg'
          width={32}
          height={32}
          alt='뒤로 가기 버튼입니다'
        />
      </div>
      <div className='text-clampXl text-center flex-[4_4_0%]'>{title}</div>
      <div className='flex-1 text-right'>{moreMenu && moreMenu}</div>
      {/**수정버튼 등 오른쪽 메뉴 추가 */}
    </header>
  );
};

export default Header;
