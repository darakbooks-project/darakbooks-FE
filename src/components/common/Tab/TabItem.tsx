import Link from 'next/link';

interface Props {
  title: string;
  active: boolean;
  navigatePath: string;
  tabPosition: string;
}

const TabItem = ({ title, active, navigatePath, tabPosition }: Props) => {
  return (
    <Link
      className={`w-[50%] inline-flex justify-center items-end w-[140px] h-[60px] border-b-2 cursor-pointer ${
        active
          ? 'border-blue-800 text-blue-800'
          : 'border-gray-400 text-gray-400'
      }`}
      data-position={tabPosition}
      href={navigatePath}
    >
      <div className='pb-[7px]' data-position={tabPosition}>
        {title}
      </div>
    </Link>
  );
};

export default TabItem;
