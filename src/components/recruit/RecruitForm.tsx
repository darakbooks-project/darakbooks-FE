import { useCallback, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

import {
  GroupFormChangeStateObjProps,
  GroupFormStateObjProps,
} from '@/types/recruit';

import AuthRequiredPage from '../auth/AuthRequiredPage';
import Header from '../common/Header';
import Seo from '../common/Seo';
import RecruitFormUserInput from './RecruitFormUserInput';

interface RecruitFormProps {
  groupStateObj: GroupFormStateObjProps;
  groupChangeStateObj: GroupFormChangeStateObjProps;
  onClickButton: () => void;
  type: string;
}

const RecruitForm = ({
  groupStateObj,
  groupChangeStateObj,
  onClickButton,
  type,
}: RecruitFormProps) => {
  const [isAllInputData, setIsAllInputData] = useState(false);

  const checkAllInputData = useCallback(
    (inputDataObj: { [key: string]: string }) => {
      return Object.keys(inputDataObj).every((key) => inputDataObj[key]);
    },
    [],
  );

  useEffect(() => {
    const inputDataObj: { [key: string]: string } = {
      ...groupStateObj,
    };
    if (checkAllInputData(inputDataObj)) return setIsAllInputData(true);
    isAllInputData && setIsAllInputData(false);
  }, [groupStateObj, isAllInputData, checkAllInputData]);

  return (
    <AuthRequiredPage>
      <Seo
        title={`다락책방 | 모임 ${type}`}
        description={`모임을 ${type}할 수 있는 공간`}
      />
      <Container>
        <Header pathname={type === '개설' ? '/recruit' : ''} />
        <Wrapper>
          <PageDescription>
            {type === '개설' ? (
              <>
                <span className='text-main font-semibold'>모임 만들기</span>
                <br />
                독서 모임을 개설해 볼까요?
              </>
            ) : (
              '모임 수정'
            )}
          </PageDescription>
          <RecruitFormWrapper>
            <RecruitFormUserInput
              groupStateObj={groupStateObj}
              groupChangeStateObj={groupChangeStateObj}
            />
          </RecruitFormWrapper>
        </Wrapper>
        <GroupButtonWrap>
          <GroupButton onClick={onClickButton} disabled={!isAllInputData}>
            {type === '개설' ? '만들기' : '수정하기'}
          </GroupButton>
        </GroupButtonWrap>
      </Container>
    </AuthRequiredPage>
  );
};

export default RecruitForm;

const Container = tw.div`
  h-full
  bg-white
`;

const Wrapper = tw.main`
  px-[5%]
  mx-auto
  bg-white
`;

const PageDescription = tw.h1`
  text-clampXl
  mt-2.5
  mb-5
`;

const RecruitFormWrapper = tw.div`
  flex
  flex-col
`;

const GroupButtonWrap = tw.div`  
  border 
  border-t-[black]
  border-opacity-10
  w-full
  px-4
  py-3
  bg-white
`;

const GroupButton = tw.button`  
  w-full
  h-14
  text-white
  rounded-lg
  font-bold

  ${(props) => (props.disabled ? 'bg-[#DFDFDF]' : 'bg-main')}
`;
