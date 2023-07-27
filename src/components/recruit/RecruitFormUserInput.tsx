import Image from 'next/image';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

import { DAY_DATA, REGION_DATA, TIME_DATA } from '@/constants/recruit';
import {
  GroupFormChangeStateObjProps,
  GroupFormStateObjProps,
} from '@/types/recruit';

interface RecruitFormUserInputProps {
  classStateObj: GroupFormStateObjProps;
  classChangeStateObj: GroupFormChangeStateObjProps;
}

const RecruitFormUserInput = ({
  classStateObj,
  classChangeStateObj,
}: RecruitFormUserInputProps) => {
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
          onClick={() => {
            classChangeStateObj.changeClassType('online');
            setOpenRegionStatus('hidden');
          }}
        >
          온라인
        </ClassTypeButton>
      </ClassType>

      <ClassRegionWrap
        $islistdisplay={openRegionStatus}
        $isbuttondisplay={classStateObj.classType}
      >
        <ClassSelectButton
          onClick={() => changeSelectItemDisplayStatus('region')}
          value={classStateObj.classRegion}
          className='relative pl-11'
        >
          <Image
            src='/images/group/map-pin.svg'
            width={24}
            height={24}
            alt='지역 아이콘'
            className='absolute top-2.5 left-4'
          />

          <span>
            {(classStateObj.classType === 'offline' &&
              classStateObj.classRegion) ||
              '지역을 선택해주세요.'}
          </span>
          <SelectArrowIconImage
            src={'/images/not-select-arrow.svg'}
            width={12.5}
            height={12.5}
            alt='선택 화살표 입니다.'
            value={openRegionStatus}
          />
        </ClassSelectButton>
        <ClassSelectList
          onClick={classChangeStateObj.changeClassRegion}
          $islistdisplay={openRegionStatus}
        >
          {REGION_DATA.map((region) => (
            <ClassSelectListItem
              key={region}
              value={region}
              className='hover:bg-black hover:bg-opacity-10'
              onClick={() => setOpenRegionStatus('hidden')}
            >
              {region}
            </ClassSelectListItem>
          ))}
        </ClassSelectList>
      </ClassRegionWrap>

      <ItemDescription>요일/시간을 선택해주세요</ItemDescription>
      <ClassDayTimeWrap
        $islistdisplay={
          openDayStatus === 'view' || openTimeStatus === 'view'
            ? 'view'
            : 'hidden'
        }
      >
        <ClassDayWrap>
          <ClassSelectButton
            onClick={() => changeSelectItemDisplayStatus('day')}
            value={classStateObj.classDay}
          >
            <span>{classStateObj.classDay || '요일'}</span>
            <SelectArrowIconImage
              src={'/images/not-select-arrow.svg'}
              width={12.5}
              height={12.5}
              alt='선택 화살표 입니다.'
              value={openDayStatus}
            />
          </ClassSelectButton>
          <ClassSelectList
            onClick={classChangeStateObj.changeClassDay}
            $islistdisplay={openDayStatus}
          >
            {DAY_DATA.map((day) => (
              <ClassSelectListItem
                key={day}
                value={day}
                className='hover:bg-black hover:bg-opacity-10'
                onClick={() => setOpenDayStatus('hidden')}
              >
                {day}요일
              </ClassSelectListItem>
            ))}
          </ClassSelectList>
        </ClassDayWrap>

        <ClassTimeWrap>
          <ClassSelectButton
            onClick={() => changeSelectItemDisplayStatus('time')}
            value={classStateObj.classTime}
          >
            <span>{classStateObj.classTime || '시간'}</span>
            <SelectArrowIconImage
              src={'/images/not-select-arrow.svg'}
              width={12.5}
              height={12.5}
              alt='선택 화살표 입니다.'
              value={openTimeStatus}
            />
          </ClassSelectButton>
          <ClassSelectList
            onClick={classChangeStateObj.changeClassTime}
            $islistdisplay={openTimeStatus}
          >
            {TIME_DATA.map((time) => (
              <ClassSelectListItem
                key={time}
                value={time}
                className='hover:bg-black hover:bg-opacity-10'
                onClick={() => setOpenTimeStatus('hidden')}
              >
                {time}
              </ClassSelectListItem>
            ))}
          </ClassSelectList>
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
      <ClassKakaoLinkWrap>
        <ClassKakaoLinkInput
          type='text'
          onChange={classChangeStateObj.changeClassKakaoLink}
          value={classStateObj.classKakaoLink}
          placeholder='링크 정보'
        />
        <ClassKakaoLinkIcon
          src='/images/group/link.svg'
          width={24}
          height={24}
          alt='링크 아이콘'
        />
      </ClassKakaoLinkWrap>
    </Container>
  );
};

export default RecruitFormUserInput;

const Container = tw.div`
`;

const ItemDescription = tw.h1`
  text-clampLg
  mb-[10px]
`;

const CommonInputStyle = tw.input`
  w-full
  border
  border-black
  border-opacity-10
  rounded
  p-[10px]
  text-clampSm
  mb-[30px]
  outline-none

  ${(props) => !props.value && 'border-red-600 border-2 border-opacity-100'}

  placeholder:text-textGray
`;

const SelectArrowIconImage = tw(Image)<{ value: string }>`
  transition-transform
  duration-300
  ease-in-out

  ${(props) => props.value === 'view' && '-rotate-180'}
`;

const ClassName = tw(CommonInputStyle)``;

const ClassDescription = tw.textarea`
  w-full 
  border
  border-black
  border-opacity-10
  rounded
  resize-none 
  h-48 
  p-[10px]
  text-clampSm
  mb-[30px]
  outline-none

  ${(props) => !props.value && 'border-red-600 border-2 border-opacity-100'}

  placeholder:text-textGray
`;

const ClassType = tw.div`
  flex
  justify-between
  mb-[20px]
`;

const ClassTypeButton = tw.button<{ classtype: string; currenttype: string }>`
  ${(props) =>
    props.classtype === props.currenttype
      ? 'border border-main text-main'
      : 'bg-[#F3F3F3] text-textGray'}

  font-semibold
  text-sm
  w-[47.5%]
  py-[10px]
  rounded
`;

const ClassSelectButton = tw.button`
  border
  w-full
  border 
  border-main
  text-textGray
  rounded
  p-[10px]
  pr-[20px]
  text-left	

  flex
  justify-between
  items-center

  ${(props) => !props.value && 'border-red-600 border-2 border-opacity-100'}
`;

const ClassSelectList = tw.ul<{ $islistdisplay: string }>`
 ${(props) => (props.$islistdisplay === 'view' ? 'block' : 'hidden')}

  border
  w-full
  border 
  border-main
  text-textGray
  rounded
  p-[10px]
  absolute
  top-[60px]
  text-left	
  h-28
  overflow-scroll
`;

const ClassSelectListItem = tw.li`
  cursor-pointer
`;

const ClassRegionWrap = tw.div<{
  $islistdisplay: string;
  $isbuttondisplay: string;
}>`
  ${(props) => (props.$islistdisplay === 'view' ? 'mb-40' : 'mb-8')}
  ${(props) => props.$isbuttondisplay === 'online' && 'hidden'}
  relative
`;

const ClassDayTimeWrap = tw.div<{ $islistdisplay: string }>`
  ${(props) => (props.$islistdisplay === 'view' ? 'mb-40' : 'mb-8')}

  flex
  justify-between	
`;

const ClassDayWrap = tw.div`
  relative
  w-[48.5%]
`;

const ClassTimeWrap = tw.div`
  relative
  w-[48.5%]
`;

const ClassPeopleNumber = tw(CommonInputStyle)``;

const ClassKakaoLinkWrap = tw.div`
  relative
`;

const ClassKakaoLinkInput = tw(CommonInputStyle)`
  pl-11
`;

const ClassKakaoLinkIcon = tw(Image)`
  absolute
  top-2.5
  left-4
`;
