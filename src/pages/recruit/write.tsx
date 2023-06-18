import { useMutation } from '@tanstack/react-query';
import tw from 'tailwind-styled-components';

import { postReadingClassOpen } from '@/api/recruit';
import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import Header from '@/components/common/Header';
import RecruitOpenForm from '@/components/recruit/RecruitOpenForm';
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
    <AuthRequiredPage>
      <Container>
        <Header />
        <Wrapper>
          <PageDescription>
            모임 만들기
            <br />
            독서 모임을 개설해 볼까요?
          </PageDescription>
          <RecruitOpenFormWrapper>
            <RecruitOpenForm
              classStateObj={classStateObj}
              classChangeStateObj={classChangeStateObj}
            />
          </RecruitOpenFormWrapper>
        </Wrapper>
        <ClassOpenButtonWrap>
          <ClassOpenButton onClick={onClickOpenButton}>만들기</ClassOpenButton>
        </ClassOpenButtonWrap>
      </Container>
    </AuthRequiredPage>
  );
};

export default RecruitWritePage;

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
