import { atom } from 'recoil';

interface ModalStateProps {
  type: 'HIDDEN' | 'SETTING' | 'BOOKS';
}

export const modalStateAtom = atom<ModalStateProps>({
  key: 'modalState',
  default: { type: 'HIDDEN' },
});

export const selectModalStateAtom = atom<boolean>({
  key: 'selectModalState',
  default: false,
});
