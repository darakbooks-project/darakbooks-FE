export interface ClassOpenStateObjProps {
  className: string;
  classType: string;
  classRegion: string;
  classDescription: string;
}

export interface ClassOpenChangeStateObjProps {
  changeClassName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeClassType: (type: string) => void;
  changeClassRegion: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  changeClassDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
