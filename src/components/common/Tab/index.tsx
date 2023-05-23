import { useState } from 'react';

import TabItem from './TabItem';

interface Props {
  leftText: string;
  rightText: string;
  leftNavigatePath: string;
  rightNavigatePath: string;
  defaultPosition: 'left' | 'right';
}

const Tab = ({
  leftText,
  rightText,
  leftNavigatePath,
  rightNavigatePath,
  defaultPosition,
}: Props) => {
  const [tabPosition, setTabPosition] = useState(defaultPosition);

  return (
    <div
      className='w-[100%] flex justify-center'
      onClick={(e) => {
        if (!(e.target instanceof HTMLElement)) return;
        const position = e.target.dataset.position;
        if (position === 'left') setTabPosition('left');
        if (position === 'right') setTabPosition('right');
      }}
    >
      <TabItem
        title={leftText}
        active={tabPosition === 'left'}
        navigatePath={leftNavigatePath}
        tabPosition='left'
      />
      <TabItem
        title={rightText}
        active={tabPosition === 'right'}
        navigatePath={rightNavigatePath}
        tabPosition='right'
      />
    </div>
  );
};

export default Tab;
