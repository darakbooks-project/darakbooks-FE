import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { fetchReadingGroupInfo, patchReadingClassChange } from '@/api/recruit';
import RecruitForm from '@/components/recruit/RecruitForm';
import { useGroupForm } from '@/hooks/useGroupForm';
import { GroupList } from '@/types/recruit';

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

  const {
    name,
    meeting_type,
    day,
    time,
    region,
    description,
    participant_limit,
    open_chat_link,
  } = groupData as GroupList;

  const classDataObj = {
    className: name,
    classType: meeting_type,
    classRegion: region,
    classDescription: description,
    classDay: day,
    classTime: time,
    classPeopleNumber: String(participant_limit),
    classKakaoLink: open_chat_link,
  };

  const { classStateObj, classChangeStateObj } = useGroupForm(classDataObj);

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
