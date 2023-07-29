import { useState } from 'react';

import {
  GroupFormChangeStateObjProps,
  GroupFormStateObjProps,
} from '@/types/recruit';

export const useGroupForm = (groupData: GroupFormStateObjProps) => {
  const {
    groupName: relayedGroupName,
    groupType: relayedGroupType,
    groupRegion: relayedGroupRegion,
    groupDescription: relayedGroupDescription,
    groupDay: relayedGroupDay,
    groupTime: relayedGroupTime,
    groupPeopleNumber: relayedGroupPeopleNumber,
    groupKakaoLink: relayedGroupKakaoLink,
  } = groupData;

  const [groupName, setGroupName] = useState(relayedGroupName);
  const [groupType, setGroupType] = useState(relayedGroupType);
  const [groupRegion, setGroupRegion] = useState(relayedGroupRegion);
  const [groupDescription, setGroupDescription] = useState(
    relayedGroupDescription,
  );
  const [groupDay, setGroupDay] = useState(relayedGroupDay);
  const [groupTime, setGroupTime] = useState(relayedGroupTime);
  const [groupPeopleNumber, setGroupPeopleNumber] = useState(
    relayedGroupPeopleNumber,
  );
  const [groupKakaoLink, setGroupKakaoLink] = useState(relayedGroupKakaoLink);

  const groupStateObj: GroupFormStateObjProps = {
    groupName,
    groupType,
    groupRegion: groupType === 'offline' ? groupRegion : 'not region data',
    groupDescription,
    groupDay,
    groupTime,
    groupPeopleNumber,
    groupKakaoLink,
  };

  const groupChangeStateObj: GroupFormChangeStateObjProps = {
    changeGroupName: (e) => {
      setGroupName(e.target.value);
    },
    changeGroupType: (type) => {
      if (type === 'online') setGroupType('online');
      else setGroupType('offline');
    },
    changeGroupRegion: (e) => {
      const selectedItem = e.target as HTMLUListElement;
      selectedItem.textContent && setGroupRegion(selectedItem.textContent);
    },
    changeGroupDescription: (e) => {
      setGroupDescription(e.target.value);
    },
    changeGroupDay: (e) => {
      const selectedItem = e.target as HTMLUListElement;
      selectedItem.textContent && setGroupDay(selectedItem.textContent);
    },
    changeGroupTime: (e) => {
      const selectedItem = e.target as HTMLUListElement;
      selectedItem.textContent && setGroupTime(selectedItem.textContent);
    },
    changeGroupPeopleNumber: (e) => {
      setGroupPeopleNumber(e.target.value);
    },
    changeGroupKakaoLink: (e) => {
      setGroupKakaoLink(e.target.value);
    },
  };

  return { groupStateObj, groupChangeStateObj } as const;
};
