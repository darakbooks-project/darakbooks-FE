import { useState } from 'react';

import TabItem from './TabItem';

interface Props {
  lefttext: string;
  righttext: string;
}

const Tab = ({ lefttext, righttext }: Props) => {
  const [tabPosition, setTabPosition] = useState('left');

  const clickLeftTap = () => {
    setTabPosition('left');
  };

  const clickRightTab = () => {
    setTabPosition('right');
  };

  return (
    <div className='w-[100%] flex justify-center'>
      <TabItem
        title={lefttext}
        active={tabPosition === 'left' && true}
        clickTab={clickLeftTap}
      />
      <TabItem
        title={righttext}
        active={tabPosition === 'right' && true}
        clickTab={clickRightTab}
      />
    </div>
  );
};

export default Tab;
