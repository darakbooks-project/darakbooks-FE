import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

import { postReadingClassOpen } from '@/api/recruit';
import Header from '@/components/common/Header';
import RecruitOpenForm from '@/components/recruit/RecruitOpenForm';
import {
  ClassOpenChangeStateObjProps,
  ClassOpenStateObjProps,
} from '@/types/recruit';

const RecruitWritePage = () => {
  const openReadingClass = useMutation(postReadingClassOpen);

  const [className, setClassName] = useState('');
  const [classType, setClassType] = useState('online');
  const [classRegion, setClassRegion] = useState('서울');
  const [classDescription, setClassDescription] = useState('');
  const [classDay, setClassDay] = useState('월');
  const [classTime, setClassTime] = useState('12:00');
  const [classPeopleNumber, setClassPeopleNumber] = useState(0);
  const [classKakaoLink, setClassKakaoLink] = useState('');

  const classStateObj: ClassOpenStateObjProps = {
    className,
    classType,
    classRegion,
    classDescription,
    classDay,
    classTime,
    classPeopleNumber,
    classKakaoLink,
  };

  const classChangeStateObj: ClassOpenChangeStateObjProps = {
    changeClassName: (e) => {
      setClassName(e.target.value);
    },
    changeClassType: (type) => {
      if (type === 'online') setClassType('online');
      else setClassType('offline');
    },
    changeClassRegion: (e) => {
      const selectedItem = e.target as HTMLUListElement;
      selectedItem.textContent && setClassRegion(selectedItem.textContent);
    },
    changeClassDescription: (e) => {
      setClassDescription(e.target.value);
    },
    changeClassDay: (e) => {
      const selectedItem = e.target as HTMLUListElement;
      selectedItem.textContent && setClassDay(selectedItem.textContent);
    },
    changeClassTime: (e) => {
      const selectedItem = e.target as HTMLUListElement;
      selectedItem.textContent && setClassTime(selectedItem.textContent);
    },
    changeClassPeopleNumber: (e) => {
      setClassPeopleNumber(parseInt(e.target.value));
    },
    changeClassKakaoLink: (e) => {
      setClassKakaoLink(e.target.value);
    },
  };

  const onClickOpenButton = () => {
    openReadingClass.mutate(classStateObj);
  };

  return (
    <Container>
      <Wrapper>
        <Header />
        <PageDescription>
          모임 만들기
          <br />
          독서 모임을 개설해 볼까요?
        </PageDescription>
        <RecruitOpenFormWrapper>
          <RecruitOpenForm
            classStateObj={classStateObj}
            classChangeStateObj={classChangeStateObj}
          />
        </RecruitOpenFormWrapper>
      </Wrapper>
      <ClassOpenButtonWrap>
        <ClassOpenButton onClick={onClickOpenButton}>만들기</ClassOpenButton>
      </ClassOpenButtonWrap>
    </Container>
  );
};

export default RecruitWritePage;

const Container = tw.div`
  h-full
  bg-white
`;

const Wrapper = tw.div`
  w-[90%]
  mx-auto
`;

const PageDescription = tw.h1`
  text-xl
  font-bold
  mt-[10px]
  mb-[20px]
`;

const RecruitOpenFormWrapper = tw.div`
  flex
  flex-col
`;

const ClassOpenButtonWrap = tw.div`  
  border 
  border-t-[black]
  border-opacity-10
  w-full
  px-[15px]
  py-[12.5px]

`;

const ClassOpenButton = tw.button`  
  bg-[#67A68A]
  w-full
  h-[55px]
  text-white
  rounded
  font-bold
`;
