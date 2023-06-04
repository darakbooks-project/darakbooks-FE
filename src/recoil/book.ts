import { atom } from 'recoil';

export const searchBookTitleAtom = atom<string>({
  key: 'searchBookTitlekey',
  default: '',
});

export const searchInfinityScrollPositionAtom = atom<number>({
  key: 'searchInfinityScrollPositionKey',
  default: 0,
});

export const searchInfinityScrollPageAtom = atom<number>({
  key: 'searchInfinityScrollPageKey',
  default: 1,
});
