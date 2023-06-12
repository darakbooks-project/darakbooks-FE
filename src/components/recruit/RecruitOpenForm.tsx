import Image from 'next/image';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

import { DAY_DATA, REGION_DATA, TIME_DATA } from '@/constants/recruit';
import {
  ClassOpenChangeStateObjProps,
  ClassOpenStateObjProps,
} from '@/types/recruit';

interface RecruitOpenFormProps {
  classStateObj: ClassOpenStateObjProps;
  classChangeStateObj: ClassOpenChangeStateObjProps;
}

const RecruitOpenForm = ({
  classStateObj,
  classChangeStateObj,
}: RecruitOpenFormProps) => {
  const [openRegionStatus, setOpenRegionStatus] = useState('hidden');
  const [openDayStatus, setOpenDayStatus] = useState('hidden');
  const [openTimeStatus, setOpenTimeStatus] = useState('hidden');

  const changeSelectItemDisplayStatus = (itemName: string) => {
    if (itemName === 'region') {
      setOpenRegionStatus((prev) => (prev === 'hidden' ? 'view' : 'hidden'));
    } else if (itemName === 'day') {
      setOpenDayStatus((prev) => (prev === 'hidden' ? 'view' : 'hidden'));
    } else if (itemName === 'time') {
      setOpenTimeStatus((prev) => (prev === 'hidden' ? 'view' : 'hidden'));
    }
  };

  return (
    <Container>
      <ItemDescription>모임 이름</ItemDescription>
      <ClassName
        type='text'
        onChange={classChangeStateObj.changeClassName}
        value={classStateObj.className}
        placeholder='이름을 작성해주세요.'
      />

      <ItemDescription>모임을 소개해 볼까요?</ItemDescription>
      <ClassDescription
        value={classStateObj.classDescription}
        onChange={classChangeStateObj.changeClassDescription}
        maxLength={1500}
        placeholder='소개 내용을 작성해주세요.'
      />

      <ItemDescription>어디에서 주로 활동하나요?</ItemDescription>
      <ClassType>
        <ClassTypeButton
          classtype='offline'
          currenttype={classStateObj.classType}
          onClick={() => classChangeStateObj.changeClassType('offline')}
        >
          오프라인
        </ClassTypeButton>
        <ClassTypeButton
          classtype='online'
          currenttype={classStateObj.classType}
          onClick={() => classChangeStateObj.changeClassType('online')}
        >
          온라인
        </ClassTypeButton>
      </ClassType>

      <ClassRegionWrap isdisplay={openRegionStatus}>
        <ClassRegionSelect>
          <span>지역</span>
          <Image
            onClick={() => changeSelectItemDisplayStatus('region')}
            src={`../images/${
              openRegionStatus === 'view' ? 'not-select-arrow' : 'select-arrow'
            }.svg`}
            width={12.5}
            height={12.5}
            alt='선택 화살표 입니다.'
          />
        </ClassRegionSelect>
        <ClassRegionList
          onClick={classChangeStateObj.changeClassRegion}
          isdisplay={openRegionStatus}
        >
          {REGION_DATA.map((region) => (
            <RegionItem
              key={region}
              value={region}
              className='hover:bg-black hover:bg-opacity-10'
            >
              {region}
            </RegionItem>
          ))}
        </ClassRegionList>
      </ClassRegionWrap>

      <ItemDescription>요일/시간을 선택해주세요</ItemDescription>
      <ClassDayTimeWrap
        isdisplay={
          openDayStatus === 'view' || openTimeStatus === 'view'
            ? 'view'
            : 'hidden'
        }
      >
        <ClassDayWrap>
          <ClassDaySelect>
            <span>요일</span>
            <Image
              onClick={() => changeSelectItemDisplayStatus('day')}
              src={`../images/${
                openDayStatus === 'view' ? 'not-select-arrow' : 'select-arrow'
              }.svg`}
              width={12.5}
              height={12.5}
              alt='선택 화살표 입니다.'
            />
          </ClassDaySelect>
          <ClassDayList
            onClick={classChangeStateObj.changeClassDay}
            isdisplay={openDayStatus}
          >
            {DAY_DATA.map((day) => (
              <DayItem
                key={day}
                value={day}
                className='hover:bg-black hover:bg-opacity-10'
              >
                {day}요일
              </DayItem>
            ))}
          </ClassDayList>
        </ClassDayWrap>

        <ClassTimeWrap>
          <ClassTimeSelect>
            <span>시간</span>
            <Image
              onClick={() => changeSelectItemDisplayStatus('time')}
              src={`../images/${
                openTimeStatus === 'view' ? 'not-select-arrow' : 'select-arrow'
              }.svg`}
              width={12.5}
              height={12.5}
              alt='선택 화살표 입니다.'
            />
          </ClassTimeSelect>
          <ClassTimeList
            onClick={classChangeStateObj.changeClassTime}
            isdisplay={openTimeStatus}
          >
            {TIME_DATA.map((time) => (
              <TimeItem
                key={time}
                value={time}
                className='hover:bg-black hover:bg-opacity-10'
              >
                {time}
              </TimeItem>
            ))}
          </ClassTimeList>
        </ClassTimeWrap>
      </ClassDayTimeWrap>

      <ItemDescription>몇명과 함께 할까요?</ItemDescription>
      <ClassPeopleNumber
        type='text'
        onChange={classChangeStateObj.changeClassPeopleNumber}
        value={classStateObj.classPeopleNumber}
        placeholder='인원'
      />

      <ItemDescription>오픈채팅 URL을 입력해주세요</ItemDescription>
      <ClassKakaoLink
        type='text'
        onChange={classChangeStateObj.changeClassKakaoLink}
        value={classStateObj.classKakaoLink}
        placeholder='링크 정보'
      />
    </Container>
  );
};

export default RecruitOpenForm;

const Container = tw.div`
`;

const ItemDescription = tw.h1`
  text-lg
  mb-[10px]
`;

const ClassName = tw.input`
  w-full
  border
  border-black
  border-opacity-10
  rounded
  p-[10px]
  text-sm
  mb-[30px]
  outline-none
`;

const ClassDescription = tw.textarea`
  w-full 
  border
  border-black
  border-opacity-10
  rounded
  resize-none 
  h-48 
  p-[10px]
  text-sm
  mb-[30px]
  outline-none
`;

const ClassType = tw.div`
  flex
  justify-between
  mb-[20px]
`;

const ClassTypeButton = tw.button<{ classtype: string; currenttype: string }>`
  ${(props) =>
    props.classtype === props.currenttype
      ? 'border border-[#67A68A]'
      : 'bg-[#F3F3F3]'}

  font-bold
  text-sm
  text-[#67A68A]
  w-[47.5%]
  py-[10px]
  rounded
`;

const ClassRegionWrap = tw.div<{ isdisplay: string }>`
  ${(props) => (props.isdisplay === 'view' ? 'mb-40' : 'mb-8')}
  relative
`;

const ClassRegionSelect = tw.button`
  border
  w-full
  border 
  border-[#67A68A]
  text-[#67A68A]
  rounded
  p-[10px]
  pr-[20px]
  text-left	

  flex
  justify-between
  items-center
`;

const ClassRegionList = tw.ul<{ isdisplay: string }>`
 ${(props) => (props.isdisplay === 'view' ? 'block' : 'hidden')}

  border
  w-full
  border 
  border-[#67A68A]
  text-[#67A68A]
  rounded
  p-[10px]
  absolute
  top-[60px]
  text-left	
  h-28
  overflow-scroll
`;

const RegionItem = tw.li`
  cursor-pointer
`;

const ClassDayTimeWrap = tw.div<{ isdisplay: string }>`
  ${(props) => (props.isdisplay === 'view' ? 'mb-40' : 'mb-8')}

  flex
  justify-between	
`;

const ClassDayWrap = tw.div`
  relative
  w-[48.5%]
`;

const ClassDaySelect = tw.button`
  border
  w-full
  border 
  border-[#67A68A]
  text-[#67A68A]
  rounded
  p-[10px]
  pr-[20px]
  text-left	

  flex
  justify-between
  items-center
`;

const ClassDayList = tw.ul<{ isdisplay: string }>`
  ${(props) => (props.isdisplay === 'view' ? 'block' : 'hidden')}
 
  border
  w-full
  border 
  border-[#67A68A]
  text-[#67A68A]
  rounded
  p-[10px]
  absolute
  top-[60px]
  text-left	
  h-28
  overflow-scroll
`;

const DayItem = tw.li`
cursor-pointer  
`;

const ClassTimeWrap = tw.div`
  relative
  w-[48.5%]
`;

const ClassTimeSelect = tw.button`
  border
  w-full
  border 
  border-[#67A68A]
  text-[#67A68A]
  rounded
  p-[10px]
  pr-[20px]
  text-left	

  flex
  justify-between
  items-center
`;

const ClassTimeList = tw.ul<{ isdisplay: string }>`
  ${(props) => (props.isdisplay === 'view' ? 'block' : 'hidden')}
  
  border
  w-full
  border 
  border-[#67A68A]
  text-[#67A68A]
  rounded
  p-[10px]
  absolute
  top-[60px]
  text-left	
  h-28
  overflow-scroll
`;

const TimeItem = tw.li`
  cursor-pointer
`;

const ClassPeopleNumber = tw.input`
  w-full
  border
  border-black
  border-opacity-10
  rounded
  p-[10px]
  text-sm
  mb-[30px]
  outline-none
`;

const ClassKakaoLink = tw.input`
  w-full
  border
  border-black
  border-opacity-10
  rounded
  p-[10px]
  text-sm
  mb-20
  outline-none
`;
