import { useState } from 'react';

import {
  ClassOpenChangeStateObjProps,
  ClassOpenStateObjProps,
} from '@/types/recruit';

export const useGroupForm = (classData: ClassOpenStateObjProps) => {
  const {
    className: relayedClassName,
    classType: relayedClassType,
    classRegion: relayedClassRegion,
    classDescription: relayedClassDescription,
    classDay: relayedClassDay,
    classTime: relayedClassTime,
    classPeopleNumber: relayedClassPeopleNumber,
    classKakaoLink: relayedClassKakaoLink,
  } = classData;

  const [className, setClassName] = useState(relayedClassName);
  const [classType, setClassType] = useState(relayedClassType);
  const [classRegion, setClassRegion] = useState(relayedClassRegion);
  const [classDescription, setClassDescription] = useState(
    relayedClassDescription,
  );
  const [classDay, setClassDay] = useState(relayedClassDay);
  const [classTime, setClassTime] = useState(relayedClassTime);
  const [classPeopleNumber, setClassPeopleNumber] = useState(
    relayedClassPeopleNumber,
  );
  const [classKakaoLink, setClassKakaoLink] = useState(relayedClassKakaoLink);

  const classStateObj: ClassOpenStateObjProps = {
    className,
    classType,
    classRegion,
    classDescription,
    classDay,
    classTime,
    classPeopleNumber,
    classKakaoLink,
  };

  const classChangeStateObj: ClassOpenChangeStateObjProps = {
    changeClassName: (e) => {
      setClassName(e.target.value);
    },
    changeClassType: (type) => {
      if (type === 'online') setClassType('online');
      else setClassType('offline');
    },
    changeClassRegion: (e) => {
      const selectedItem = e.target as HTMLUListElement;
      selectedItem.textContent && setClassRegion(selectedItem.textContent);
    },
    changeClassDescription: (e) => {
      setClassDescription(e.target.value);
    },
    changeClassDay: (e) => {
      const selectedItem = e.target as HTMLUListElement;
      selectedItem.textContent && setClassDay(selectedItem.textContent);
    },
    changeClassTime: (e) => {
      const selectedItem = e.target as HTMLUListElement;
      selectedItem.textContent && setClassTime(selectedItem.textContent);
    },
    changeClassPeopleNumber: (e) => {
      setClassPeopleNumber(e.target.value);
    },
    changeClassKakaoLink: (e) => {
      setClassKakaoLink(e.target.value);
    },
  };

  return { classStateObj, classChangeStateObj } as const;
};
