import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { postReadingClassOpen } from '@/api/recruit';
import RecruitForm from '@/components/recruit/RecruitForm';
import { useGroupForm } from '@/hooks/useGroupForm';

const RecruitWritePage = () => {
  const { push } = useRouter();

  const queryClient = useQueryClient();
  const { mutate: openReadingClass } = useMutation(postReadingClassOpen, {
    onSuccess: (groupId) => {
      queryClient.invalidateQueries(['reading', 'group', 'list']);
      push({
        pathname: '/recruit/detail',
        query: {
          groupId,
          islistchange: true,
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
