import { atom } from 'recoil';

export const searchBookTitleAtom = atom<string>({
  key: 'searchBookTitlekey',
  default: '',
});

export const searchInfinityScrollPageAtom = atom<number>({
  key: 'searchInfinityScrollPageKey',
  default: 1,
});
