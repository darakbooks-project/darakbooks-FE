import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

import { fetchReadingGroupInfo, patchReadingClassChange } from '@/api/recruit';
import Header from '@/components/common/Header';
import RecruitFormUserInput from '@/components/recruit/RecruitFormUserInput';
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
    <>
      <Container>
        <Header />
        <Wrapper>
          <PageDescription>
            모임 만들기
            <br />
            독서 모임을 개설해 볼까요?
          </PageDescription>
          <RecruitOpenFormWrapper>
            <RecruitFormUserInput
              classStateObj={classStateObj}
              classChangeStateObj={classChangeStateObj}
            />
          </RecruitOpenFormWrapper>
        </Wrapper>
        <ClassOpenButtonWrap>
          <ClassOpenButton onClick={onClickUpdateButton}>
            수정하기
          </ClassOpenButton>
        </ClassOpenButtonWrap>
      </Container>
    </>
  );
};

export default RecruitUpdatePage;

const Container = tw.div`
  h-full
  bg-white
`;

const Wrapper = tw.div`
  px-[5%]
  mx-auto
  bg-white
`;

const PageDescription = tw.h1`
  text-xl
  font-bold
  mt-[10px]
  mb-[20px]
`;

const RecruitOpenFormWrapper = tw.div`
  flex
  flex-col
`;

const ClassOpenButtonWrap = tw.div`  
  border 
  border-t-[black]
  border-opacity-10
  w-full
  px-[15px]
  py-[12.5px]
  bg-white
`;

const ClassOpenButton = tw.button`  
  bg-[#67A68A]
  w-full
  h-[55px]
  text-white
  rounded
  font-bold
`;
