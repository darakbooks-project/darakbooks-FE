import React from 'react';

import Tab from '../common/Tab';

function RecruitTab() {
  return (
    <Tab
      leftText='모임설명'
      rightText='채팅'
      leftNavigatePath='/recruit/detail'
      rightNavigatePath='/recruit/chatting'
      defaultPosition='left'
    />
  );
}

export default RecruitTab;
