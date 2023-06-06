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
