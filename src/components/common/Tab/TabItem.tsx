interface Props {
  title: string;
  active?: boolean;
}

const TabItem = ({ title, active }: Props) => {
  return (
    <div
      className={`w-[50%] inline-flex justify-center items-end w-[140px] h-[60px] border-b-2 cursor-pointer ${
        active
          ? 'border-blue-800 text-blue-800'
          : 'border-gray-400 text-gray-400'
      }`}
    >
      <div className='pb-[7px]'>{title}</div>
    </div>
  );
};

export default TabItem;
