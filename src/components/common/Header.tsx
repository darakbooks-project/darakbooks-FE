import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
}

const Header = ({ title }: Props) => {
  const router = useRouter();

  return (
    <div className='flex pt-[20px] mb-[20px] items-center'>
      <Image
        onClick={() => router.back()}
        className='mr-[15px] cursor-pointer'
        src='../images/back-button.svg'
        width={20}
        height={20}
        alt='뒤로 가기 버튼입니다'
      />
      <div className='text-xl'>{title}</div>
    </div>
  );
};

export default Header;
