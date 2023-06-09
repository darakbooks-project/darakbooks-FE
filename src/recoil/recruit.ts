import { atom } from 'recoil';

export const readingGroupInfinityScrollPositionAtom = atom<number>({
  key: 'readingGroupInfinityScrollPositionKey',
  default: 0,
});
