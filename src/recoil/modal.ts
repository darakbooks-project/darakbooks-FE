import { atom } from 'recoil';

export interface ModalStateProps {
  type: 'HIDDEN' | 'SETTING' | 'BOOKS' | 'GROUPJOIN' | 'GROUPLEAVE';
}

export interface selectBookProps {
  isbn: string;
  title: string;
  thumbnail: string;
  author: string;
}

export const modalStateAtom = atom<ModalStateProps>({
  key: 'modalState',
  default: { type: 'HIDDEN' },
});

export const selectModalStateAtom = atom<boolean>({
  key: 'selectModalState',
  default: false,
});

export const selectModalDataAtom = atom<selectBookProps>({
  key: 'selectModalData',
  default: { isbn: '', title: '', thumbnail: '', author: '' },
});
