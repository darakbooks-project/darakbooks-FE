import Image from 'next/image';
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

      <ClassRegionWrap>
        <ClassRegionSelect>
          <span>지역</span>
          <Image
            src='../images/select-arrow.svg'
            width={12.5}
            height={12.5}
            alt='선택 화살표 입니다.'
          />
        </ClassRegionSelect>
        <ClassRegionList onChange={classChangeStateObj.changeClassRegion}>
          {REGION_DATA.map((region) => (
            <RegionItem key={region} value={region}>
              {region}
            </RegionItem>
          ))}
        </ClassRegionList>
      </ClassRegionWrap>

      <ItemDescription>요일/시간을 선택해주세요</ItemDescription>
      <ClassDayTimeWrap>
        <ClassDayWrap>
          <ClassDaySelect>
            <span>요일</span>
            <Image
              src='../images/select-arrow.svg'
              width={12.5}
              height={12.5}
              alt='선택 화살표 입니다.'
            />
          </ClassDaySelect>
          <ClassDayList onChange={classChangeStateObj.changeClassDay}>
            {DAY_DATA.map((day) => (
              <DayItem key={day} value={day}>
                {day}요일
              </DayItem>
            ))}
          </ClassDayList>
        </ClassDayWrap>

        <ClassTimeWrap>
          <ClassTimeSelect>
            <span>시간</span>
            <Image
              src='../images/select-arrow.svg'
              width={12.5}
              height={12.5}
              alt='선택 화살표 입니다.'
            />
          </ClassTimeSelect>
          <ClassTimeList onChange={classChangeStateObj.changeClassTime}>
            {TIME_DATA.map((time) => (
              <TimeItem key={time} value={time}>
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

const ClassRegionWrap = tw.div`
  relative
  mb-36
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

const ClassRegionList = tw.ul`
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

const RegionItem = tw.li``;

const ClassDayTimeWrap = tw.div`
  flex
  mb-36
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

const ClassDayList = tw.ul`
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

const DayItem = tw.li``;

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

const ClassTimeList = tw.ul`
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

const TimeItem = tw.li``;

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
