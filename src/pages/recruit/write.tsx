import { useMutation } from '@tanstack/react-query';

import { postReadingClassOpen } from '@/api/recruit';
import RecruitForm from '@/components/recruit/RecruitForm';
import { useGroupForm } from '@/hooks/useGroupForm';

const RecruitWritePage = () => {
  const openReadingClass = useMutation(postReadingClassOpen);
  const onClickOpenButton = () => {
    openReadingClass.mutate(classStateObj);
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
