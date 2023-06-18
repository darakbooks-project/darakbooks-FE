import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { fetchReadingGroupInfo, patchReadingClassChange } from '@/api/recruit';
import RecruitForm from '@/components/recruit/RecruitForm';
import { useGroupForm } from '@/hooks/useGroupForm';

const RecruitUpdatePage = () => {
  const {
    query: { groupId },
    push,
  } = useRouter();

  const { mutate: updateReadingGroup } = useMutation(patchReadingClassChange);
  const onClickUpdateButton = () => {
    if (!groupId || Array.isArray(groupId)) return;

    updateReadingGroup({
      groupId: parseInt(groupId),
      groupData: {
        name: classStateObj.className,
        recruitment_status: true,
        meeting_type: classStateObj.classType,
        day: classStateObj.classDay,
        time: classStateObj.classTime,
        region: classStateObj.classRegion,
        description: classStateObj.classDescription,
        participant_limit: parseInt(classStateObj.classPeopleNumber),
        open_chat_link: classStateObj.classKakaoLink,
      },
    });

    push(`/recruit/detail?groupId=${groupId}`);
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

  const { classStateObj, classChangeStateObj } = useGroupForm({
    className: groupData?.name ?? '',
    classType: groupData?.meeting_type ?? '',
    classRegion: groupData?.region ?? '',
    classDescription: groupData?.description ?? '',
    classDay: groupData?.day ?? '',
    classTime: groupData?.time ?? '',
    classPeopleNumber: String(groupData?.participant_limit ?? ''),
    classKakaoLink: groupData?.open_chat_link ?? '',
  });

  if (isGroupLoading) return <></>;
  if (isGroupError) return <></>;

  return (
    <RecruitForm
      classStateObj={classStateObj}
      classChangeStateObj={classChangeStateObj}
      onClickButton={onClickUpdateButton}
      type='수정'
    />
  );
};

export default RecruitUpdatePage;
