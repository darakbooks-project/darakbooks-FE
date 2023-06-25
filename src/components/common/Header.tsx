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
    <div
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
          className='cursor-pointer'
          src='/images/header/back-button.svg'
          width={20}
          height={20}
          alt='뒤로 가기 버튼입니다'
        />
      </div>
      <div className='text-xl text-center flex-[4_4_0%]'>{title}</div>
      <div className='flex-1 text-right'>{moreMenu && moreMenu}</div>
      {/**수정버튼 등 오른쪽 메뉴 추가 */}
    </div>
  );
};

export default Header;
