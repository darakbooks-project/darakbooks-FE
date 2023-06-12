export interface ClassOpenStateObjProps {
  className: string;
  classType: string;
  classRegion: string;
  classDescription: string;
  classDay: string;
  classTime: string;
  classPeopleNumber: number;
  classKakaoLink: string;
}

export interface ClassOpenChangeStateObjProps {
  changeClassName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeClassType: (type: string) => void;
  changeClassRegion: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  changeClassDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  changeClassDay: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  changeClassTime: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  changeClassPeopleNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeClassKakaoLink: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface GroupLists {
  groups: GroupList[];
  totalPages: number;
  totalGroups: number;
  currentPage: string;
}

export interface GroupList {
  group_id: number;
  name: string;
  recruitment_status: boolean;
  meeting_type: string;
  day: string;
  time: string;
  region: string;
  description: string;
  participant_limit: number;
  open_chat_link: string;
  group_lead: string;
  userGroup: UserGroup[];
}

export interface UserGroup {
  age: string;
  gender: string;
  groups: number[];
  nickname: string;
  profileImg: string;
  provider: string;
  userId: string;
  userInfo: string;
}
