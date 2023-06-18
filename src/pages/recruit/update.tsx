import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { fetchReadingGroupInfo } from '@/api/recruit';

const RecruitUpdatePage = () => {
  const {
    query: { groupId },
  } = useRouter();

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

  console.log(groupData);

  if (isGroupLoading) return <></>;
  if (isGroupError) return <></>;

  return (
    <>
      <h1>독서 모임 수정페이지 입니다.</h1>
    </>
  );
};

export default RecruitUpdatePage;
