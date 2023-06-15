export interface ClassOpenStateObjProps {
  className: string;
  classType: string;
  classRegion: string;
  classDescription: string;
  classDay: string;
  classTime: string;
  classPeopleNumber: string;
  classKakaoLink: string;
}

export interface ClassOpenChangeStateObjProps {
  changeClassName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeClassType: (type: string) => void;
  changeClassRegion: (e: React.MouseEvent<HTMLUListElement>) => void;
  changeClassDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  changeClassDay: (e: React.MouseEvent<HTMLUListElement>) => void;
  changeClassTime: (e: React.MouseEvent<HTMLUListElement>) => void;
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

export interface BestGroupListType {
  group_group_id: number;
  group_name: string;
  group_recruitment_status: number;
  group_meeting_type: string;
  group_day: string;
  group_time: string;
  group_region: string;
  group_description: string;
  group_participant_limit: number;
  group_open_chat_link: string;
  group_group_lead: string;
  group_created_at: string;
  group_updated_at: string;
  group_deleted_at: string | null;
  group: number;
  userCount: string;
}

export interface GroupLeaderType {
  age: string;
  gender: string;
  groups: number[];
  nickname: string;
  photoUrl: string;
  provider: string;
  userId: string;
  userInfo: string | null;
  photoId: string;
  bookshelfIsHidden: boolean;
  groupIsHidden: boolean;
}
