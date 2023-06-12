import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface Props {
  title?: string;
  moreMenu?: ReactNode;
}

const Header = ({ title, moreMenu }: Props) => {
  const router = useRouter();

  return (
    <div className='w-full flex justify-between items-center h-14 px-5'>
      <div className='flex-1'>
        <Image
          onClick={() => router.back()}
          className='cursor-pointer'
          src='/images/back-button.svg'
          width={20}
          height={20}
          alt='뒤로 가기 버튼입니다'
        />
      </div>
      <div className='text-xl text-center flex-[4_4_0%]'>{title}</div>
      <div className='flex-1'>{moreMenu && moreMenu}</div>
      {/**수정버튼 등 오른쪽 메뉴 추가 */}
    </div>
  );
};

export default Header;
