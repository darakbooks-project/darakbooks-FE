import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

import { useAuth } from '@/hooks/useAuth';
import useRememberScroll from '@/hooks/useRememberScroll';
import { isAuthorizedSelector } from '@/recoil/auth';
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
  const { openAuthRequiredModal } = useAuth();
  const isAuthorized = useRecoilValue(isAuthorizedSelector);
  const { setScroll } = useRememberScroll('groupList');

  const clickListItem = () => {
    if (!isAuthorized) {
      openAuthRequiredModal();
      return;
    }

    setScroll();

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
  p-4
  relative
  cursor-pointer
  mb-3.5
  border
  border-black
  border-opacity-10
  rounded-lg	
`;

const GroupName = tw.span` 
  font-bold
  text-[1.063rem]
`;

const GroupInformation = tw.div`
  text-[0.765rem]
  text-[#707070]
  space-x-1.5
  my-1.5
  flex
  items-center
`;

const Divider = tw.div`
  w-1
  h-1
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
  text-[0.588rem]
  rounded
  px-1.5
  py-1
`;
