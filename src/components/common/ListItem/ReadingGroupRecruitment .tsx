import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';

import { useAuth } from '@/hooks/useAuth';
import { isAuthorizedSelector } from '@/recoil/auth';
import { readingGroupInfinityScrollPositionAtom } from '@/recoil/recruit';
import { GroupList } from '@/types/recruit';

interface ReadingGroupRecruitmentProps {
  listItemData: GroupList;
}

const ReadingGroupRecruitment = ({
  listItemData: {
    group_id,
    name,
    meeting_type,
    day,
    time,
    region,
    recruitment_status,
  },
}: ReadingGroupRecruitmentProps) => {
  const router = useRouter();
  const setInfinityScrollPosition = useSetRecoilState(
    readingGroupInfinityScrollPositionAtom,
  );
  const { openAuthRequiredModal } = useAuth();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);

  const clickListItem = () => {
    if (!isAuthorized) {
      openAuthRequiredModal();
      return;
    }

    setInfinityScrollPosition(window.scrollY);

    router.push(`/recruit/detail?groupId=${group_id}`);
  };

  return (
    <Container onClick={clickListItem}>
      <GroupName>{name}</GroupName>
      <GroupInformation>
        <span>{meeting_type === 'offline' ? region : '온라인'}</span>
        <Divider />
        <span>매주 {day}</span>
        <span>{time}</span>
      </GroupInformation>
      <GroupRrecruitmentButtonWrap className='space-x-2'>
        <span></span>
        <GroupRrecruitmentButton
          recruitmentstatus={recruitment_status ? '모집중' : '모집완료'}
        >
          {recruitment_status ? '모집중' : '모집완료'}
        </GroupRrecruitmentButton>
      </GroupRrecruitmentButtonWrap>
    </Container>
  );
};

export default ReadingGroupRecruitment;

const Container = tw.div`
  w-[100%]
  p-[15px]
  relative
  cursor-pointer
  mb-[30px]
  border
  border-black
  border-opacity-10
  rounded-lg	
`;

const GroupName = tw.span` 
  font-bold
  text-[17px]
`;

const GroupInformation = tw.div`
  text-[13px]
  text-black
  text-opacity-50
  space-x-1
  my-[5px]
  flex
  items-center
`;

const Divider = tw.div`
  w-[4px]
  h-[4px]
  bg-black
  bg-opacity-30
  border
  rounded-full
`;

const GroupRrecruitmentButtonWrap = tw.div`
  flex
  justify-between
`;

const GroupRrecruitmentButton = tw.button<{ recruitmentstatus: string }>`
  ${(props) => props.recruitmentstatus === '모집완료' && 'bg-opacity-50'}
    
  bg-main
  text-white
  text-[10px]
  rounded
  px-[7.5px]
  py-[5px]
`;
