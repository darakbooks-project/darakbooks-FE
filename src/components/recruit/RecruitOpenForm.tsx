import tw from 'tailwind-styled-components';

import { DAY_DATA, REGION_DATA, TIME_DATA } from '@/constants/recruit';
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
            classStateObj.classType === 'online' ? 'bg-blue-100' : 'bg-white'
          }
          onClick={() => classChangeStateObj.changeClassType('online')}
        >
          온라인
        </ClassTypeButton>
        <ClassTypeButton
          className={
            classStateObj.classType === 'offline' ? 'bg-blue-100' : 'bg-white'
          }
          onClick={() => classChangeStateObj.changeClassType('offline')}
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
      <ClassDaySelect onChange={classChangeStateObj.changeClassRegion}>
        {DAY_DATA.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </ClassDaySelect>
      <ClassTimeSelect onChange={classChangeStateObj.changeClassRegion}>
        {TIME_DATA.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </ClassTimeSelect>
      <ClassDescription
        value={classStateObj.classDescription}
        onChange={classChangeStateObj.changeClassDescription}
        maxLength={1500}
        placeholder='독서 모임 설명을 입력해주세요'
      ></ClassDescription>
      <ClassPeopleNumber
        type='text'
        onChange={classChangeStateObj.changeClassPeopleNumber}
        value={classStateObj.classPeopleNumber}
        placeholder='인원 수를 입력해주세요'
      />
      <ClassKakaoLink
        type='text'
        onChange={classChangeStateObj.changeClassKakaoLink}
        value={classStateObj.classKakaoLink}
        placeholder='카카오 링크를 입력해주세요'
      />
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

const ClassDaySelect = tw.select`
  border
  border-black
`;

const ClassTimeSelect = tw.select`
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

const ClassPeopleNumber = tw.input`
  w-full
  border
  border-black
`;

const ClassKakaoLink = tw.input`
  w-full
  border
  border-black
`;
