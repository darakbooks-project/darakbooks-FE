import { atom } from 'recoil';

import { selectBookProps } from '@/types/modal';

export interface ModalStateProps {
  type:
    | 'SETTING'
    | 'BOOKS'
    | 'GROUPJOIN'
    | 'GROUPLEAVE'
    | 'BOOKSHELF'
    | 'HIDDEN';
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

export const selectRecruitStatusAtom = atom<boolean>({
  key: 'selectRecruitStatus',
  default: false,
});
