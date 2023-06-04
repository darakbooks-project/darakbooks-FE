import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

import Header from '@/components/common/Header';
import RecruitOpenForm from '@/components/recruit/RecruitOpenForm';
import {
  ClassOpenChangeStateObjProps,
  ClassOpenStateObjProps,
} from '@/types/recruit';

const RecruitWritePage = () => {
  const [className, setClassName] = useState('');
  const [classType, setClassType] = useState('on');
  const [classRegion, setClassRegion] = useState('서울');
  const [classDescription, setClassDescription] = useState('');

  const classStateObj: ClassOpenStateObjProps = {
    className,
    classType,
    classRegion,
    classDescription,
  };

  const classChangeStateObj: ClassOpenChangeStateObjProps = {
    changeClassName: (e) => {
      setClassName(e.target.value);
    },
    changeClassType: (type) => {
      if (type === 'on') setClassType('on');
      else setClassType('off');
    },
    changeClassRegion: (e) => {
      setClassRegion(e.target.value);
    },
    changeClassDescription: (e) => {
      setClassDescription(e.target.value);
    },
  };

  const openReadingClass = () => {
    // by 민형, API 호출 함수(POST) 및 객체 + isRecruiting: true, 전달_230529
    // useMutation(classState);
  };

  return (
    <Container>
      <Header title='개설 하기' />
      <Wrapper>
        <RecruitOpenForm
          classStateObj={classStateObj}
          classChangeStateObj={classChangeStateObj}
        />
        <ClassOpenButton onClick={openReadingClass}>모임 개설</ClassOpenButton>
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

const ClassOpenButton = tw.button`  
  bg-blue-300
`;
