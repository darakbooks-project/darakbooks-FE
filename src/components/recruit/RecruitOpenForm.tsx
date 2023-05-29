import tw from 'tailwind-styled-components';

import { REGION_DATA } from '@/constants/region';
import {
  ClassOpenChangeStateObjProps,
  ClassOpenStateObjProps,
} from '@/types/recruit';

interface RecruitOpenFormProps {
  classStateObj: ClassOpenStateObjProps;
  classChangeStateObj: ClassOpenChangeStateObjProps;
}

const RecruitOpenForm = ({
  classStateObj,
  classChangeStateObj,
}: RecruitOpenFormProps) => {
  return (
    <>
      <ClassName
        type='text'
        onChange={classChangeStateObj.changeClassName}
        value={classStateObj.className}
        placeholder='독서 모임 이름을 입력해주세요'
      />
      <ClassType>
        <ClassTypeButton
          className={
            classStateObj.classType === 'on' ? 'bg-blue-100' : 'bg-white'
          }
          onClick={() => classChangeStateObj.changeClassType('on')}
        >
          온라인
        </ClassTypeButton>
        <ClassTypeButton
          className={
            classStateObj.classType === 'off' ? 'bg-blue-100' : 'bg-white'
          }
          onClick={() => classChangeStateObj.changeClassType('off')}
        >
          오프라인
        </ClassTypeButton>
      </ClassType>
      <ClassRegionSelect onChange={classChangeStateObj.changeClassRegion}>
        {REGION_DATA.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </ClassRegionSelect>
      <ClassDescription
        value={classStateObj.classDescription}
        onChange={classChangeStateObj.changeClassDescription}
        maxLength={1500}
        placeholder='독서 모임 설명을 입력해주세요'
      ></ClassDescription>
    </>
  );
};

export default RecruitOpenForm;

const ClassName = tw.input`
  w-full
  border
  border-black
`;

const ClassType = tw.div`
  flex
  justify-between
`;

const ClassTypeButton = tw.button``;

const ClassRegionSelect = tw.select`
  border
  border-black
`;

const ClassDescription = tw.textarea`
  border-basic 
  w-full 
  resize-none 
  h-2/5 
  p-1
`;
