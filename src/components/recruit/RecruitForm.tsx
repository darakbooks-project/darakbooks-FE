import tw from 'tailwind-styled-components';

import {
  GroupFormChangeStateObjProps,
  GroupFormStateObjProps,
} from '@/types/recruit';

import AuthRequiredPage from '../auth/AuthRequiredPage';
import Header from '../common/Header';
import RecruitFormUserInput from './RecruitFormUserInput';

interface RecruitFormProps {
  classStateObj: GroupFormStateObjProps;
  classChangeStateObj: GroupFormChangeStateObjProps;
  onClickButton: () => void;
  type: string;
}

const RecruitForm = ({
  classStateObj,
  classChangeStateObj,
  onClickButton,
  type,
}: RecruitFormProps) => {
  return (
    <AuthRequiredPage>
      <Container>
        <Header pathname={type === '개설' ? '/recruit' : ''} />
        <Wrapper>
          <PageDescription>
            {type === '개설' ? (
              <>
                모임 만들기
                <br />
                독서 모임을 개설해 볼까요?
              </>
            ) : (
              '모임 수정'
            )}
          </PageDescription>
          <RecruitFormWrapper>
            <RecruitFormUserInput
              classStateObj={classStateObj}
              classChangeStateObj={classChangeStateObj}
            />
          </RecruitFormWrapper>
        </Wrapper>
        <ClassButtonWrap>
          <ClassButton onClick={onClickButton}>
            {type === '개설' ? '만들기' : '수정하기'}
          </ClassButton>
        </ClassButtonWrap>
      </Container>
    </AuthRequiredPage>
  );
};

export default RecruitForm;

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

const RecruitFormWrapper = tw.div`
  flex
  flex-col
`;

const ClassButtonWrap = tw.div`  
  border 
  border-t-[black]
  border-opacity-10
  w-full
  px-[15px]
  py-[12.5px]
  bg-white
`;

const ClassButton = tw.button`  
  bg-[#67A68A]
  w-full
  h-[55px]
  text-white
  rounded
  font-bold
`;
