import TabItem from './TabItem';

interface Props {
  lefttext: string;
  righttext: string;
  leftNavigatePath: string;
  rightNavigatePath: string;
  position: 'left' | 'right';
}

const Tab = ({
  lefttext,
  righttext,
  leftNavigatePath,
  rightNavigatePath,
  position,
}: Props) => {
  return (
    <div className='w-[100%] flex justify-center'>
      <TabItem
        title={lefttext}
        active={position === 'left'}
        navigatePath={leftNavigatePath}
      />
      <TabItem
        title={righttext}
        active={position === 'right'}
        navigatePath={rightNavigatePath}
      />
    </div>
  );
};

export default Tab;
