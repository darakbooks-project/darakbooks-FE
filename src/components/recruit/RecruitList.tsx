import { GroupList } from '@/types/recruit';

import ReadingGroupRecruitment from '../common/ListItem/ReadingGroupRecruitment ';

interface RecruitListProps {
  listData: GroupList[];
}

const RecruitList = ({ listData }: RecruitListProps) => {
  return (
    <>
      {listData.map((listItemData) => (
        <ReadingGroupRecruitment
          key={listItemData.group_id}
          listItemData={listItemData}
        />
      ))}
    </>
  );
};

export default RecruitList;
