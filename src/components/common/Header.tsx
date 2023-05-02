import Image from 'next/image';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <div className='flex my-[20px]'>
      <Image
        className='mr-[15px]'
        src='./images/back-button.svg'
        width={20}
        height={20}
        alt='뒤로 가기 버튼입니다'
      />
      <div className='text-xl'>{title}</div>
    </div>
  );
};

export default Header;
