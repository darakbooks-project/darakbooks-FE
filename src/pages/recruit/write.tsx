import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

import Header from '@/components/common/Header';

const RecruitWritePage = () => {
  const [className, setClassName] = useState('');
  const [classType, setClassType] = useState('on');
  const [classRegion, setClassRegion] = useState('서울');
  const [classDescription, setClassDescription] = useState('');

  const changeClassName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassName(e.target.value);
  };

  const changeClassType = (type: string) => {
    if (type === 'on') setClassType('on');
    else setClassType('off');
  };

  const changeClassDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setClassDescription(e.target.value);
  };

  return (
    <Container>
      <Header title='개설 하기' />
      <Wrapper>
        <ClassName
          type='text'
          onChange={changeClassName}
          value={className}
          placeholder='독서 모임 이름을 입력해주세요'
        />
        <ClassType>
          <ClassTypeButton
            className={classType === 'on' ? 'bg-blue-100' : 'bg-white'}
            onClick={() => changeClassType('on')}
          >
            온라인
          </ClassTypeButton>
          <ClassTypeButton
            className={classType === 'off' ? 'bg-blue-100' : 'bg-white'}
            onClick={() => changeClassType('off')}
          >
            오프라인
          </ClassTypeButton>
        </ClassType>
        <ClassRegionSelect>
          <option value={classRegion}>{classRegion}</option>
        </ClassRegionSelect>
        <ClassDescription
          value={classDescription}
          onChange={changeClassDescription}
          maxLength={1500}
          placeholder='독서 모임 설명을 입력해주세요'
        ></ClassDescription>
        <ClassOpenButton>모임 개설</ClassOpenButton>
      </Wrapper>
    </Container>
  );
};

export default RecruitWritePage;

const Container = tw.div``;

const Wrapper = tw.div`
  flex
  flex-col
`;

const ClassName = tw.input`
  w-full
  border
  border-black
`;

const ClassType = tw.div`
  flex
  justify-between
`;

const ClassTypeButton = tw.button``;

const ClassRegionSelect = tw.select`
  border
  border-black
`;

const ClassDescription = tw.textarea`
  border-basic 
  w-full 
  resize-none 
  h-2/5 
  p-1
`;

const ClassOpenButton = tw.button`  
  bg-blue-300
`;
