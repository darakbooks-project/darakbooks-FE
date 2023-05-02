import Link from 'next/link';

interface Props {
  title: string;
  active?: boolean;
  navigatePath: string;
}

const TabItem = ({ title, active, navigatePath }: Props) => {
  return (
    <Link
      className={`w-[50%] inline-flex justify-center items-end w-[140px] h-[60px] border-b-2 cursor-pointer ${
        active
          ? 'border-blue-800 text-blue-800'
          : 'border-gray-400 text-gray-400'
      }`}
      href={navigatePath}
    >
      <div className='pb-[7px]'>{title}</div>
    </Link>
  );
};

export default TabItem;
