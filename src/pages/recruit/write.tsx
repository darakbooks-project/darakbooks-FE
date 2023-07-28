import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { postReadingGroupOpen } from '@/api/recruit';
import RecruitForm from '@/components/recruit/RecruitForm';
import { useGroupForm } from '@/hooks/useGroupForm';

const RecruitWritePage = () => {
  const { push } = useRouter();

  const queryClient = useQueryClient();
  const { mutate: openReadingGroup } = useMutation(postReadingGroupOpen, {
    onSuccess: (groupId) => {
      queryClient.invalidateQueries(['reading', 'group', 'list']);
      push({
        pathname: '/recruit/detail',
        query: {
          groupId,
          listchangetype: 'open',
        },
      });
    },
  });

  const onClickOpenButton = () => {
    openReadingGroup(groupStateObj);
  };

  const groupDataObj = {
    groupName: '',
    groupType: 'online',
    groupRegion: '',
    groupDescription: '',
    groupDay: '',
    groupTime: '',
    groupPeopleNumber: '',
    groupKakaoLink: '',
  };
  const { groupStateObj, groupChangeStateObj } = useGroupForm(groupDataObj);

  return (
    <RecruitForm
      groupStateObj={groupStateObj}
      groupChangeStateObj={groupChangeStateObj}
      onClickButton={onClickOpenButton}
      type='개설'
    />
  );
};

export default RecruitWritePage;
