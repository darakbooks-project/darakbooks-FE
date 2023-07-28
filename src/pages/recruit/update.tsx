import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { fetchReadingGroupInfo, patchReadingGroupChange } from '@/api/recruit';
import RecruitForm from '@/components/recruit/RecruitForm';
import { useGroupForm } from '@/hooks/useGroupForm';

const RecruitUpdatePage = () => {
  const {
    query: { groupId },
    push,
  } = useRouter();

  const queryClient = useQueryClient();
  const { mutate: updateReadingGroup } = useMutation(patchReadingGroupChange, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reading', 'group', 'list']);
      push({
        pathname: '/recruit/detail',
        query: {
          groupId,
          listchangetype: 'update',
        },
      });
    },
  });

  const onClickUpdateButton = () => {
    if (!groupId || Array.isArray(groupId)) return;

    updateReadingGroup({
      groupId: parseInt(groupId),
      groupData: {
        name: groupStateObj.groupName,
        recruitment_status: true,
        meeting_type: groupStateObj.groupType,
        day: groupStateObj.groupDay,
        time: groupStateObj.groupTime,
        region: groupStateObj.groupRegion,
        description: groupStateObj.groupDescription,
        participant_limit: parseInt(groupStateObj.groupPeopleNumber),
        open_chat_link: groupStateObj.groupKakaoLink,
      },
    });
  };

  const {
    data: groupData,
    isError: isGroupError,
    isLoading: isGroupLoading,
  } = useQuery(
    ['recruitDetail', groupId],
    () => fetchReadingGroupInfo(groupId as string),
    {
      staleTime: Infinity,
    },
  );

  const { groupStateObj, groupChangeStateObj } = useGroupForm({
    groupName: groupData?.name ?? '',
    groupType: groupData?.meeting_type ?? '',
    groupRegion: groupData?.region ?? '',
    groupDescription: groupData?.description ?? '',
    groupDay: groupData?.day ?? '',
    groupTime: groupData?.time ?? '',
    groupPeopleNumber: String(groupData?.participant_limit ?? ''),
    groupKakaoLink: groupData?.open_chat_link ?? '',
  });

  if (isGroupLoading) return <></>;
  if (isGroupError) return <></>;

  return (
    <RecruitForm
      groupStateObj={groupStateObj}
      groupChangeStateObj={groupChangeStateObj}
      onClickButton={onClickUpdateButton}
      type='수정'
    />
  );
};

export default RecruitUpdatePage;
