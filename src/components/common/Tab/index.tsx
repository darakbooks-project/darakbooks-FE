import TabItem from './TabItem';

interface Props {
  lefttext: string;
  righttext: string;
}

const Tab = ({ lefttext, righttext }: Props) => {
  return (
    <div className='w-[100%] flex justify-center'>
      <TabItem title={lefttext} active={true} />
      <TabItem title={righttext} active={false} />
    </div>
  );
};

export default Tab;
