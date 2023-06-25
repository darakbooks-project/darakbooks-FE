import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { postReadingClassOpen } from '@/api/recruit';
import RecruitForm from '@/components/recruit/RecruitForm';
import { useGroupForm } from '@/hooks/useGroupForm';

const RecruitWritePage = () => {
  const { push } = useRouter();

  const queryClient = useQueryClient();
  const { mutate: openReadingClass } = useMutation(postReadingClassOpen, {
    // by 민형, 현재 모임 개설 시 group id를 응답 받을 수 없으므로 임시로 조회 페이지로 redirect_230620
    onSuccess: () => {
      queryClient.invalidateQueries(['reading', 'group', 'list']);
      push({
        pathname: '/recruit',
        query: {
          islistchange: 'open',
        },
      });
    },
  });

  const onClickOpenButton = () => {
    openReadingClass(classStateObj);
  };

  const classDataObj = {
    className: '',
    classType: 'online',
    classRegion: '',
    classDescription: '',
    classDay: '',
    classTime: '',
    classPeopleNumber: '',
    classKakaoLink: '',
  };
  const { classStateObj, classChangeStateObj } = useGroupForm(classDataObj);

  return (
    <RecruitForm
      classStateObj={classStateObj}
      classChangeStateObj={classChangeStateObj}
      onClickButton={onClickOpenButton}
      type='개설'
    />
  );
};

export default RecruitWritePage;
