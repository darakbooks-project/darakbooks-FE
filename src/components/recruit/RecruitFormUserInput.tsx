import Image from 'next/image';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

import { DAY_DATA, REGION_DATA, TIME_DATA } from '@/constants/recruit';
import {
  GroupFormChangeStateObjProps,
  GroupFormStateObjProps,
} from '@/types/recruit';

interface RecruitFormUserInputProps {
  groupStateObj: GroupFormStateObjProps;
  groupChangeStateObj: GroupFormChangeStateObjProps;
}

const RecruitFormUserInput = ({
  groupStateObj,
  groupChangeStateObj,
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
      <GroupName
        type='text'
        onChange={groupChangeStateObj.changeGroupName}
        value={groupStateObj.groupName}
        placeholder='이름을 작성해주세요.'
      />

      <ItemDescription>모임을 소개해 볼까요?</ItemDescription>
      <GroupDescription
        value={groupStateObj.groupDescription}
        onChange={groupChangeStateObj.changeGroupDescription}
        maxLength={1500}
        placeholder='소개 내용을 작성해주세요.'
      />

      <ItemDescription>어디에서 주로 활동하나요?</ItemDescription>
      <GroupType>
        <GroupTypeButton
          grouptype='offline'
          currenttype={groupStateObj.groupType}
          onClick={() => groupChangeStateObj.changeGroupType('offline')}
        >
          오프라인
        </GroupTypeButton>
        <GroupTypeButton
          grouptype='online'
          currenttype={groupStateObj.groupType}
          onClick={() => {
            groupChangeStateObj.changeGroupType('online');
            setOpenRegionStatus('hidden');
          }}
        >
          온라인
        </GroupTypeButton>
      </GroupType>

      <GroupRegionWrap
        $islistdisplay={openRegionStatus}
        $isbuttondisplay={groupStateObj.groupType}
      >
        <GroupSelectButton
          onClick={() => changeSelectItemDisplayStatus('region')}
          value={groupStateObj.groupRegion}
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
            {(groupStateObj.groupType === 'offline' &&
              groupStateObj.groupRegion) ||
              '지역을 선택해주세요.'}
          </span>
          <SelectArrowIconImage
            src={'/images/not-select-arrow.svg'}
            width={12.5}
            height={12.5}
            alt='선택 화살표 입니다.'
            value={openRegionStatus}
          />
        </GroupSelectButton>
        <GroupSelectList
          onClick={groupChangeStateObj.changeGroupRegion}
          $islistdisplay={openRegionStatus}
        >
          {REGION_DATA.map((region) => (
            <GroupSelectListItem
              key={region}
              value={region}
              className='hover:bg-black hover:bg-opacity-10'
              onClick={() => setOpenRegionStatus('hidden')}
            >
              {region}
            </GroupSelectListItem>
          ))}
        </GroupSelectList>
      </GroupRegionWrap>

      <ItemDescription>요일/시간을 선택해주세요</ItemDescription>
      <GroupDayTimeWrap
        $islistdisplay={
          openDayStatus === 'view' || openTimeStatus === 'view'
            ? 'view'
            : 'hidden'
        }
      >
        <GroupDayWrap>
          <GroupSelectButton
            onClick={() => changeSelectItemDisplayStatus('day')}
            value={groupStateObj.groupDay}
          >
            <span>{groupStateObj.groupDay || '요일'}</span>
            <SelectArrowIconImage
              src={'/images/not-select-arrow.svg'}
              width={12.5}
              height={12.5}
              alt='선택 화살표 입니다.'
              value={openDayStatus}
            />
          </GroupSelectButton>
          <GroupSelectList
            onClick={groupChangeStateObj.changeGroupDay}
            $islistdisplay={openDayStatus}
          >
            {DAY_DATA.map((day) => (
              <GroupSelectListItem
                key={day}
                value={day}
                className='hover:bg-black hover:bg-opacity-10'
                onClick={() => setOpenDayStatus('hidden')}
              >
                {day}요일
              </GroupSelectListItem>
            ))}
          </GroupSelectList>
        </GroupDayWrap>

        <GroupTimeWrap>
          <GroupSelectButton
            onClick={() => changeSelectItemDisplayStatus('time')}
            value={groupStateObj.groupTime}
          >
            <span>{groupStateObj.groupTime || '시간'}</span>
            <SelectArrowIconImage
              src={'/images/not-select-arrow.svg'}
              width={12.5}
              height={12.5}
              alt='선택 화살표 입니다.'
              value={openTimeStatus}
            />
          </GroupSelectButton>
          <GroupSelectList
            onClick={groupChangeStateObj.changeGroupTime}
            $islistdisplay={openTimeStatus}
          >
            {TIME_DATA.map((time) => (
              <GroupSelectListItem
                key={time}
                value={time}
                className='hover:bg-black hover:bg-opacity-10'
                onClick={() => setOpenTimeStatus('hidden')}
              >
                {time}
              </GroupSelectListItem>
            ))}
          </GroupSelectList>
        </GroupTimeWrap>
      </GroupDayTimeWrap>

      <ItemDescription>몇명과 함께 할까요?</ItemDescription>
      <GroupPeopleNumber
        type='text'
        onChange={groupChangeStateObj.changeGroupPeopleNumber}
        value={groupStateObj.groupPeopleNumber}
        placeholder='인원'
      />

      <ItemDescription>오픈채팅 URL을 입력해주세요</ItemDescription>
      <GroupKakaoLinkWrap>
        <GroupKakaoLinkInput
          type='text'
          onChange={groupChangeStateObj.changeGroupKakaoLink}
          value={groupStateObj.groupKakaoLink}
          placeholder='링크 정보'
        />
        <GroupKakaoLinkIcon
          src='/images/group/link.svg'
          width={24}
          height={24}
          alt='링크 아이콘'
        />
      </GroupKakaoLinkWrap>
    </Container>
  );
};

export default RecruitFormUserInput;

const Container = tw.section`
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

const GroupName = tw(CommonInputStyle)``;

const GroupDescription = tw.textarea`
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

const GroupType = tw.div`
  flex
  justify-between
  mb-[20px]
`;

const GroupTypeButton = tw.button<{ grouptype: string; currenttype: string }>`
  ${(props) =>
    props.grouptype === props.currenttype
      ? 'border border-main text-main'
      : 'bg-[#F3F3F3] text-textGray'}

  font-semibold
  text-sm
  w-[47.5%]
  py-[10px]
  rounded
`;

const GroupSelectButton = tw.button`
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

const GroupSelectList = tw.ul<{ $islistdisplay: string }>`
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

const GroupSelectListItem = tw.li`
  cursor-pointer
`;

const GroupRegionWrap = tw.div<{
  $islistdisplay: string;
  $isbuttondisplay: string;
}>`
  ${(props) => (props.$islistdisplay === 'view' ? 'mb-40' : 'mb-8')}
  ${(props) => props.$isbuttondisplay === 'online' && 'hidden'}
  relative
`;

const GroupDayTimeWrap = tw.div<{ $islistdisplay: string }>`
  ${(props) => (props.$islistdisplay === 'view' ? 'mb-40' : 'mb-8')}

  flex
  justify-between	
`;

const GroupDayWrap = tw.div`
  relative
  w-[48.5%]
`;

const GroupTimeWrap = tw.div`
  relative
  w-[48.5%]
`;

const GroupPeopleNumber = tw(CommonInputStyle)``;

const GroupKakaoLinkWrap = tw.div`
  relative
`;

const GroupKakaoLinkInput = tw(CommonInputStyle)`
  pl-11
`;

const GroupKakaoLinkIcon = tw(Image)`
  absolute
  top-2.5
  left-4
`;
