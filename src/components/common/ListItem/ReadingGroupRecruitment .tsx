import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

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

  const clickListItem = () => {
    setInfinityScrollPosition(window.scrollY);

    router.push(`/recruit/detail?groupId=${group_id}`);
  };

  return (
    <div
      onClick={clickListItem}
      className='w-[100%] flex items-center bg-yellow-600 px-[20px] py-[15px] relative cursor-pointer mb-[30px]'
    >
      <div className='font-bold text-[15px] ml-[20px]'>
        <span className='text-xl'>{name}</span>
        <div className='space-x-2 my-[2px]'>
          <span>{meeting_type === 'offline' ? region : '온라인'}</span>
          <span>{day}요일</span>
        </div>
        <div className='space-x-2'>
          <span>{recruitment_status ? '모집 중' : '모집 완료'}</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default ReadingGroupRecruitment;
